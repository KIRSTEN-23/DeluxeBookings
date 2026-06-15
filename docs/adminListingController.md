/*
─────────────────────────────────────────────────────────────
ADMIN LISTING CONTROLLER
─────────────────────────────────────────────────────────────

Listing moderation and approval.

Related Routes:
GET   /api/admin/listings
GET   /api/admin/listings/review
PATCH /api/admin/listings/:id/approve
PATCH /api/admin/listings/:id/reject

*/

/* MOVE THE ABOVE COMMENT To docs/ once code is implemented, 
as it only serves as guidelines for development and is not needed in the final codebase. */

/*
─────────────────────────────────────────────────────────────
USE THE FOLLOWING FUNCTION AND ROUTE SIGNATURES FOR THIS CONTROLLER


getAllListingsAdmin()
GET /api/admin/listings

getListingsInReview()
GET /api/admin/listings/review

getListingForReview()
GET /api/admin/listings/:id

approveListing()
PATCH /api/admin/listings/:id/approve

rejectListing()
PATCH /api/admin/listings/:id/reject

restoreListing()
PATCH /api/admin/listings/:id/restore

removeListing()
DELETE /api/admin/listings/:id

*/