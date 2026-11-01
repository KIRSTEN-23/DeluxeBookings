const { test } = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const Listing = require('../features/listings/listingSchema');
const Booking = require('../features/bookings/bookingSchema');
const User = require('../features/users/userSchema');
const seller = require('../features/listings/sellerListingController');
const admin = require('../features/listings/adminListingController');
const { createBooking } = require('../features/bookings/buyerBookingsController');
const { registerUser } = require('../features/auth/authController');
const { updateUserProfile } = require('../features/users/userController');
const response = () => ({ code: 200, status(code) { this.code = code; return this; }, json(body) { this.body = body; return this; }, send(body) { this.body = body; return this; } });

test('booking model exports a model accepting the persisted booking fields', async () => {
  assert.equal(typeof Booking.create, 'function');
  const booking = new Booking({ listing: new mongoose.Types.ObjectId(), firstName: 'Test', lastName: 'Guest', email: 'test@example.com', phone: '123', destination: 'Cape Town', suite: 'Stay', guests: 2, checkIn: '2030-01-01', checkOut: '2030-01-02' });
  await booking.validate();
});

test('booking uses selected published listing and server price', async (t) => {
  t.mock.method(Listing, 'findOne', async (query) => {
    assert.equal(query.status, 'published'); assert.equal(query.isPaused, false);
    return { _id: query._id, title: 'Stay', location: { displayAddress: 'Cape Town' }, guestCapacity: 2, pricePerNight: 1000 };
  });
  t.mock.method(Booking, 'create', async (data) => {
    assert.equal(data.totalPrice, 2000); assert.equal(data.suite, 'Stay'); assert.equal(data.guests, 2);
    return data;
  });
  const res = response();
  await createBooking({ body: { listing: new mongoose.Types.ObjectId().toString(), firstName: 'Test', lastName: 'Guest', email: 't@example.com', phone: '1', guests: 2, arrivalDate: '2030-01-01', departureDate: '2030-01-03', totalPrice: 1 } }, res);
  assert.equal(res.code, 201);
});

test('invalid booking dates are rejected before database work', async () => {
  const res = response();
  await createBooking({ body: { firstName: 'Test', lastName: 'Guest', email: 't@example.com', phone: '1', arrivalDate: 'bad', departureDate: 'bad' } }, res);
  assert.equal(res.code, 400);
});

test('seller editing cannot change status or ownership', async (t) => {
  t.mock.method(Listing, 'findOne', async () => ({ status: 'published' }));
  t.mock.method(Listing, 'findOneAndUpdate', async (query, update) => {
    assert.equal(query.seller, 'seller');
    assert.equal(query.status, 'published');
    assert.deepEqual(update, { $set: { title: 'Updated', status: 'in_review' } });
    return { title: 'Updated' };
  });
  const res = response();
  await seller.updateSellerListing({ user: { id: 'seller' }, params: { id: 'listing' }, body: { title: 'Updated', status: 'published', seller: 'other', adminReview: { notes: 'Approved' } } }, res);
  assert.equal(res.code, 200);
});

test('publish and unpublish require their previous status', async (t) => {
  const states = [];
  t.mock.method(Listing, 'findOneAndUpdate', async (query) => { states.push(query.status); return {}; });
  const req = { user: { id: 'seller' }, params: { id: 'listing' } };
  await seller.publishSellerListing(req, response());
  await seller.unpublishSellerListing(req, response());
  assert.deepEqual(states, ['unpublished', 'published']);
});

test('admin decisions only update listings awaiting review', async (t) => {
  t.mock.method(Listing, 'findOneAndUpdate', async (query) => { assert.equal(query.status, 'in_review'); return null; });
  for (const action of [admin.approveListing, admin.rejectListing]) {
    const res = response();
    await action({ user: { id: 'admin' }, params: { id: 'listing' }, body: { notes: 'Please provide more details.' } }, res);
    assert.equal(res.code, 409);
  }
});

test('public registration and profile update cannot assign administrator', async () => {
  const registration = response();
  await registerUser({ body: { name: 'Test', email: 't@example.com', password: '111', userRole: 'A' } }, registration);
  assert.equal(registration.code, 400);
  const profile = response();
  await updateUserProfile({ user: { id: 'user', userRole: 'B' }, body: { userRole: 'A' } }, profile);
  assert.equal(profile.code, 403);
});

test('seller and admin middleware reject inappropriate roles', () => {
  for (const middleware of [require('../middleware/requireSeller'), require('../middleware/requireRole')]) {
    const res = response();
    middleware({ user: { userRole: 'B' } }, res, () => assert.fail('must not authorize buyer'));
    assert.equal(res.code, 403);
  }
});

test('search excludes unpublished listings and combines guest, location and bedroom filters', async (t) => {
  const search = require('../features/listings/searchListingController').searchListings;
  t.mock.method(Listing, 'find', (filter) => {
    assert.equal(filter.status, 'published');
    assert.equal(filter.isPaused, false);
    assert.equal(filter.propertyType, 'apartment');
    assert.equal(filter['location.city'], 'Cape Town');
    assert.deepEqual(filter.guestCapacity, { $gte: 5 });
    assert.deepEqual(filter.$or, [{ bedrooms: 2 }, { bedrooms: { $gte: 4 } }]);
    assert.deepEqual(filter.amenities, { $all: ['WiFi', 'Pool'] });
    return { sort: async () => [] };
  });
  const res = response();
  await search({ query: { guestCapacity: '5', propertyType: 'apartment', city: 'Cape Town', bedrooms: '2,4', amenities: 'WiFi,Pool' } }, res);
  assert.deepEqual(res.body, []);
});

test('search rejects invalid query values rather than querying the database', async (t) => {
  t.mock.method(Listing, 'find', () => assert.fail('must not query with invalid input'));
  const search = require('../features/listings/searchListingController').searchListings;
  for (const query of [{ guestCapacity: '-1' }, { propertyType: { $ne: 'hotel' } }, { bedrooms: '4,bad' }, { city: { $ne: '' } }]) {
    const res = response();
    await search({ query }, res);
    assert.equal(res.code, 400);
  }
});

test('rejection requires actionable notes', async (t) => {
  t.mock.method(Listing, 'findOneAndUpdate', () => assert.fail('must not reject without notes'));
  const res = response();
  await admin.rejectListing({ body: { notes: '   ' } }, res);
  assert.equal(res.code, 400);
});

test('only the owner of a rejected listing can resubmit it', async (t) => {
  t.mock.method(Listing, 'findOneAndUpdate', async (filter, update) => {
    assert.deepEqual(filter, { _id: 'listing', seller: 'seller', status: 'rejected' });
    assert.equal(update.$set.status, 'in_review');
    return null;
  });
  const res = response();
  await seller.resubmitSellerListing({ user: { id: 'seller' }, params: { id: 'listing' } }, res);
  assert.equal(res.code, 409);
});

test('token verification uses current database roles and rejects deleted accounts', async (t) => {
  const jwt = require('jsonwebtoken');
  const verify = require('../middleware/verifyToken');
  const previousSecret = process.env.JWT_SECRET;
  process.env.JWT_SECRET = 'workflow-test-secret';
  t.after(() => { if (previousSecret === undefined) delete process.env.JWT_SECRET; else process.env.JWT_SECRET = previousSecret; });
  const id = new mongoose.Types.ObjectId();
  const token = jwt.sign({ id: id.toString(), userRole: 'A' }, process.env.JWT_SECRET);
  t.mock.method(User, 'findById', () => ({ select: async () => ({ _id: id, userRole: 'B' }) }));
  const req = { headers: { authorization: `Bearer ${token}` } };
  let nextCalled = false;
  await verify(req, response(), () => { nextCalled = true; });
  assert.equal(nextCalled, true);
  assert.equal(req.user.userRole, 'B');
  User.findById.mock.mockImplementation(() => ({ select: async () => null }));
  const res = response();
  await verify(req, res, () => assert.fail('deleted account must not authenticate'));
  assert.equal(res.code, 401);
});

test('missing, invalid and expired tokens are rejected without database access', async (t) => {
  const previousSecret = process.env.JWT_SECRET;
  process.env.JWT_SECRET = 'workflow-test-secret';
  t.after(() => { if (previousSecret === undefined) delete process.env.JWT_SECRET; else process.env.JWT_SECRET = previousSecret; });
  const expired = require('jsonwebtoken').sign({ id: new mongoose.Types.ObjectId().toString() }, process.env.JWT_SECRET, { expiresIn: -1 });
  const verify = require('../middleware/verifyToken');
  t.mock.method(User, 'findById', () => assert.fail('must not query for invalid token'));
  for (const headers of [{}, { authorization: 'Bearer invalid' }, { authorization: `Bearer ${expired}` }]) {
    const res = response();
    await verify({ headers }, res, () => assert.fail('must not authenticate'));
    assert.equal(res.code, 401);
  }
});

test('seller booking results are scoped to owned listings', async (t) => {
  const id = new mongoose.Types.ObjectId();
  t.mock.method(Listing, 'find', (filter) => {
    assert.deepEqual(filter, { seller: 'seller' });
    return { select: async () => [{ _id: id }] };
  });
  t.mock.method(Booking, 'find', (filter) => {
    assert.deepEqual(filter, { listing: { $in: [id] } });
    return { sort: async () => [] };
  });
  const res = response();
  await require('../features/bookings/sellerBookingController').getSellerBookings({ user: { id: 'seller' } }, res);
  assert.deepEqual(res.body, []);
});
