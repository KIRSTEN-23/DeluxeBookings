# Deluxe Bookings: 10-minute listings portfolio presentation

**Presenter:** Kirsten Venter\
**Group collaborators:** Khanyisile Manana and Joelene du Toit\
**Focus:** the listings entity within the shared DV200 MERN application\
**Format:** 10 slides, including a three-minute local live demo

[Canva presentation](https://canva.link/kggp8nfvz0thqff) · [Original group deck](https://docs.google.com/presentation/d/1VcBYSDnHgo7BGjqqqkDsqbiWnNSc8-G-iYqFT0hJzWM/edit)

The original outline was for a 30-minute group session. This version follows the shorter portfolio requirements. It keeps team context brief and concentrates the technical explanation on listings. The wording below is a suggested script to rehearse and adapt to your own experience, not a verbatim record of what you said or learned during the term.

The current code includes a later portfolio audit/refinement pass. Distinguish that version from the original group submission when discussing development history.

## Timing

| Slide | Topic | Duration | Running time |
| --- | --- | --- | --- |
| 1 | Deluxe Bookings: context | 0:35 | 0:00–0:35 |
| 2 | My contribution | 0:35 | 0:35–1:10 |
| 3 | Thought process | 0:55 | 1:10–2:05 |
| 4 | Planning and iteration | 1:00 | 2:05–3:05 |
| 5 | Tech stack and why | 0:55 | 3:05–4:00 |
| 6 | Listings API: Create and Read | 1:00 | 4:00–5:00 |
| 7 | Live demo | 3:00 | 5:00–8:00 |
| 8 | Listings API: Update and Delete | 1:15 | 8:00–9:15 |
| 9 | Learning from the term | 0:30 | 9:15–9:45 |
| 10 | Next steps | 0:15 | 9:45–10:00 |

Do setup before starting the timer. Do not add a separate agenda, whole-application tour or Q&A segment inside the ten minutes.

## Suggested narration

### 1. Deluxe Bookings — 35 seconds

“Deluxe Bookings is a group MERN project for a luxury accommodation marketplace. Travellers discover properties, sellers manage listings and administrators review submissions. The listing has to remain consistent across those different journeys, while unpublished properties stay out of the public catalogue. This is a local academic prototype. My portfolio focuses on the listings entity, which was my part of the application.”

Name Khanyisile Manana and Joelene du Toit as collaborators. Do not imply that you built every feature yourself.

### 2. My contribution — 35 seconds

“My part connects the property data to buyer, seller and administrator views. That includes the listing schema, the listing API, CRUD operations and the review-to-publication flow. Shared listing components allow the same property information to appear in different contexts. Authentication, bookings and reviews are wider team features. I will mention them where they connect to listings rather than presenting the whole application as my own work.”

### 3. Thought process — 55 seconds

“The main decision was to use one listing model. A buyer’s property card and a seller’s edit form should describe the same property rather than maintain separate copies. I separated the views because each role needs different actions. A traveller needs discovery and details, while the seller needs editing and publication controls.

“The other decision was to make publication explicit. Saving a form does not mean a property should become public. A listing goes through review first, and approval leaves it unpublished until its owner chooses to publish it. That rule belongs in the API as well as the interface.”

### 4. Planning and iteration — 60 seconds

Point to the authentic original wireframe on this slide. It includes listing detail and checkout planning. It is planning evidence, not a screenshot of the current build.

“The wireframes helped identify which property details needed to be shared across screens. I translated those into a listing schema and then connected the schema to routes, controllers and React components. The planning included features such as ratings and saved properties. Those should not be confused with completed features in the current version.

“The portfolio refinement pass exposed another part of the work: making the interfaces and API agree. Route links, request fields, action handlers and status messages all affect whether the journey works. I also refined the fluid layout so search controls and listing content fit their available space.”

Keep the comparison grounded in the repository. Do not claim formal user interviews, usability studies or measured conversion improvements.

### 5. Tech stack and why — 55 seconds

“MongoDB fits the nested structure of a property: its location, photos, amenities and review information. Mongoose adds the schema and validation rules around that data. Node and Express let us create our own JavaScript API with separate routes, middleware and controllers.

“React supports reusable listing cards and forms, and routing separates the public and role-specific views. The team authentication uses bcrypt and JWT. For my listings work, the connection is that the API must know which account is making the request before it can decide whether that account owns a listing or may review it.”

If asked, Vite is the frontend development/build tool. React Bootstrap supplies common controls. Avoid reading the full dependency list aloud.

### 6. Listings API: Create and Read — 60 seconds

“These are the first two CRUD operations in my custom listings API. The POST request creates a listing from allowed property fields. The server takes the seller ID from the authenticated account and sets the initial status to in review. A client cannot assign a different owner or make the listing published just by sending those fields. The response is 201 with the created document.

“The GET request reads a single listing for the seller's edit form. Both the listing ID and seller ID must match. The controller returns 200 with the document, or 404 if it cannot find an owned listing. That gives the interface a clear result to display.

“I will demonstrate the CRUD flow now, then explain Update and Delete.”

The slide shows the database excerpts. The complete handlers also include error responses. The URL shown is the shared base: POST uses that base, and GET appends `/:id`. `sellerId` is `req.user.id`, established through authentication middleware.

### 7. Live demo — 180 seconds

Use the runbook below. Narrate what the viewer needs to notice rather than every click. Keep the holding slide available while switching to the browser.

### 8. Listings API: Update and Delete — 75 seconds

“The edit action uses PUT to save changes. The controller has already loaded the seller's listing and calculated the next status. This update checks its ID, owner and current status, then sets only the allowed fields. Mongoose runs validation and returns the updated document.

“The status condition catches a listing whose status changed between the read and this update. If that happens, the controller returns 409 and asks the user to reload. It does not detect every concurrent field edit. Approved or published listings return to review after editing. Rejected listings stay rejected until the seller resubmits them.

“DELETE uses the ID and authenticated seller to remove an owned listing. If no record matches, the controller returns 404. Otherwise it returns the deleted ID and a success message. The interface can then remove the item and display feedback.

“Together, these four routes show our own API connecting interface actions to controlled database changes and HTTP responses.”

Do not read every code line. Point to the owner condition, allowed fields, validation and delete operation. The slide abbreviates the surrounding handler; the README and source provide the full context. These are single-document operations, not a transaction across collections.

### 9. Learning from the term — 30 seconds

“Creating our own API made the connection between interface actions, request validation, database updates and feedback much clearer. Creative authentication also helped distinguish two questions: how an account signs in, and what that account is allowed to do. My listings work uses that authenticated identity to enforce ownership and role permissions. The picture-password interaction remains a learning prototype rather than production-grade authentication.”

### 10. Next steps — 15 seconds

“My next priorities are completing device and accessibility checks, moving property images to dedicated storage, and strengthening authentication before production use. The repository contains the implementation and planning evidence. Thank you.”

## Three-minute demo runbook

### Prepare before recording

- Start the API and frontend and confirm the assessment MongoDB connection.
- Use fictional data and small property images. Do not expose environment files, tokens or real credentials in the recording.
- Keep separate signed-in seller and administrator sessions, using separate browser profiles or a private window. Tabs in the same profile share local storage and may replace the account session.
- Prepare a valid local listing draft so the demo shows the flow without spending a minute typing. Browser drafts belong to the account and browser where they were saved.
- Prepare a separate disposable **unpublished** listing for the delete demonstration. Never use a valued record or a booking-linked assessment record merely to demonstrate deletion.
- Open public browse, seller account, admin review queue and the controller excerpts.
- Rehearse the entire sequence against the current database. The automated tests mock database operations and do not prove this live sequence is ready.

| Demo time | Action | What to say/show |
| --- | --- | --- |
| 0:00–0:20 | Briefly show login or an existing authenticated seller session. | The picture-choice login is shared team context. Listings use the resulting identity. Skip live registration. |
| 0:20–0:45 | Browse, apply one filter and open a property. | Read operation and property information shared across views. |
| 0:45–1:35 | Resume the prepared draft, show its fields and submit it. | Create operation, validation and the `in_review` outcome. |
| 1:35–2:05 | Switch to the prepared admin session and approve the submission. | Approval makes it eligible to publish, not immediately public. |
| 2:05–2:25 | Return to the seller, refresh as needed, publish and show the public result. | Ownership, eligible state and successful publication. |
| 2:25–2:45 | Edit a listing and save it. | Update operation and return-to-review feedback. |
| 2:45–3:00 | Delete the separate disposable unpublished listing. | Delete operation, confirmation and the updated list. |

If a request fails during rehearsal, repair the flow before recording. For an unavoidable recording interruption, clearly identify any pre-recorded fallback rather than presenting it as live.

## CRUD source reference

The presentation uses short database excerpts across slides 6 and 8. Their formatting is compacted for readability. The slide panels use Default Dark syntax colours and 26 pt monospace code, rendered as images. Editable HTML sources and matching PNGs are in [code-snippets](code-snippets); the text excerpts below remain copyable. The README includes the surrounding response logic, and the source contains the full handlers and error handling.

| Operation | HTTP request | Controller source lines | Response |
| --- | --- | --- | --- |
| Create | `POST /api/listings/seller/my-listings` | 38–55 | 201, or 400 on failure |
| Read | `GET /api/listings/seller/my-listings/:id` | 19–36 | 200, 404, or 500 |
| Update | `PUT /api/listings/seller/my-listings/:id` | 60–91 | 200, 404, 409, or 400 |
| Delete | `DELETE /api/listings/seller/my-listings/:id` | 160–182 | 200, 404, or 500 |

Source: [`sellerListingController.js`](../../backend/features/listings/sellerListingController.js). Line references reflect the version used to prepare this guide. [`listingRoutes.js`](../../backend/features/listings/listingRoutes.js) supplies the route and middleware connections.

### Create

```js
const listing = await Listing.create({
  ...pickListingFields(req.body),
  seller: sellerId,
  status: LISTING_STATUS.IN_REVIEW,
});

res.status(201).json(listing);
```

`pickListingFields` accepts only editable property fields. The server supplies the authenticated owner and initial `in_review` status, then returns the new listing with HTTP 201.

### Read

```js
const listing = await Listing.findOne({
  _id: req.params.id,
  seller: sellerId,
});

if (!listing) {
  return res.status(404).json({ message: "Listing not found." });
}

res.status(200).json(listing);
```

The query matches both the requested ID and the authenticated seller. This read populates the edit form. A missing or unowned record returns 404; a successful read returns 200.

### Update

```js
const sellerId = req.user.id;
const existing = await Listing.findOne({ _id: req.params.id, seller: sellerId });
if (!existing) return res.status(404).json({ message: "Listing not found." });
const nextStatus = existing.status === LISTING_STATUS.REJECTED ? LISTING_STATUS.REJECTED : LISTING_STATUS.IN_REVIEW;

const listing = await Listing.findOneAndUpdate(
  {
    _id: req.params.id,
    seller: sellerId,
    status: existing.status,
  },
  { $set: { ...pickListingFields(req.body), status: nextStatus } },
  {
    new: true,
    runValidators: true,
  },
);

if (!listing) {
  return res.status(409).json({ message: "This listing changed while you were editing. Reload it and try again." });
}

res.status(200).json(listing);
```

The controller first loads the owned listing and calculates its next status. It then updates allowed fields, runs schema validators and requires the status to still match the one it read. An intervening status change returns 409. This guard does not detect every concurrent field edit. Approved or published listings return to review; rejected listings remain rejected until resubmission.

### Delete

```js
const listing = await Listing.findOneAndDelete({
  _id: req.params.id,

  seller: sellerId,
});

if (!listing) {
  return res.status(404).json({ message: "Listing not found." });
}

res.status(200).json({
  message: "Listing permanently deleted.",

  listingId: req.params.id,
});
```

The delete query includes ownership. A missing or unowned record returns 404. Success returns HTTP 200 with the deleted ID and a message the interface can display.

### Workflow points to retain during the demo

A new listing enters `in_review`. Admin approval changes it to `unpublished`; the seller then publishes it. Rejection includes a reason and allows correction and resubmission. Save draft stores an unfinished form in the browser rather than creating a database listing.

## Source and ownership notes

- [Original group presentation](https://docs.google.com/presentation/d/1VcBYSDnHgo7BGjqqqkDsqbiWnNSc8-G-iYqFT0hJzWM/edit): application concept, team context, planning and group development challenges.
- Supplied DV200 group outline: assessment coverage. The user’s shorter portfolio guidance determines the ten-minute structure.
- Current repository: code, supported features and implementation limits. Recent audit/refinement work should not be presented as an unchanged historical submission.
- [`wireframes3.png`](../../frontend/src/Assets/ReadMeimages/wireframes3.png): authentic original group planning for listing details and checkout. Planned payment/ratings UI is not evidence of implemented payment or rating aggregation.
- [Kirsten Venter](https://github.com/KIRSTEN-23): presenter and listings contribution, as specified for this portfolio.
- [Khanyisile Manana](https://github.com/Khanyi20) and [Joelene du Toit](https://github.com/Joelene241161): credited collaborators. Their exact feature split is not assigned without confirmation.

Canva's generation did not retain presenter notes, so this guide is the complete timed speaking reference.
