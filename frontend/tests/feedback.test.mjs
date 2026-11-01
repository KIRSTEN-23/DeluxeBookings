import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateListing, propertyTypeValue } from '../src/utils/listingValidation.js';
import { errorMessage } from '../src/utils/feedback.js';

const valid = { propertyName: 'Test stay', propertyType: 'Hotel room', description: 'A comfortable property for a relaxing family holiday.', city: 'Cape Town', bedrooms: 0, bathrooms: 1, guestCapacity: 2, pricePerNight: 1000, images: [{ url: 'https://example.com/photo.jpg' }] };

test('valid zero-bedroom properties can be submitted', () => {
  assert.equal(validateListing(valid), null);
});

test('incomplete forms direct users to the first field group needing attention', () => {
  assert.equal(validateListing({ ...valid, city: '' }).step, 2);
  assert.equal(validateListing({ ...valid, pricePerNight: 0 }).step, 4);
  assert.equal(validateListing({ ...valid, guestCapacity: 1.5 }).step, 3);
  assert.equal(validateListing({ ...valid, bedrooms: '' }).step, 3);
  assert.equal(validateListing({ ...valid, images: [] }).step, 5);
});

test('validating the current step does not block on future steps', () => {
  assert.equal(validateListing({ propertyType: 'Villa' }, 0), null);
});

test('property labels map to persisted values', () => {
  assert.equal(propertyTypeValue('Hotel room'), 'hotel');
  assert.equal(propertyTypeValue('Guesthouse'), 'guest_house');
  assert.equal(propertyTypeValue('Beach house'), 'beach_house');
});

test('feedback handles server strings, structured errors and offline failures', () => {
  assert.equal(errorMessage({ response: { data: 'Wrong details' } }), 'Wrong details');
  assert.equal(errorMessage({ response: { data: { error: 'Fix dates' } } }), 'Fix dates');
  assert.equal(errorMessage({ response: { data: { message: 'Try again' } } }), 'Try again');
  assert.equal(errorMessage({}, 'Offline'), 'Offline');
  assert.equal(errorMessage({ response: { data: '<html>Internal error</html>' } }, 'Try again'), 'Try again');
});
