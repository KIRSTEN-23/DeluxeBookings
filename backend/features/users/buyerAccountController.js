/*
─────────────────────────────────────────────────────────────
BUYER ACCOUNT CONTROLLER(BONUS FEATURE)
─────────────────────────────────────────────────────────────

Buyer-specific account actions.

Related Routes:
GET    /api/buyer/favourites
POST   /api/buyer/favourites/:listingId
DELETE /api/buyer/favourites/:listingId

*/

/* MOVE THE ABOVE COMMENT To docs/ once code is implemented, 
as it only serves as guidelines for development and is not needed in the final codebase. */

/*
─────────────────────────────────────────────────────────────
USE THE FOLLOWING FUNCTION AND ROUTE SIGNATURES FOR THIS CONTROLLER

getFavouriteListings()
GET /api/buyer/favourites

addFavouriteListing()
POST /api/buyer/favourites/:listingId

removeFavouriteListing()
DELETE /api/buyer/favourites/:listingId

*/

// router.post("/listings/:id/favourite", (req, res) => {
//   res.json({
//     message: "Buyer: favourite listing",
//     listingId: req.params.id,
//   });
// });