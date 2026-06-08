/*
─────────────────────────────────────────────────────────────
USER CONTROLLER
─────────────────────────────────────────────────────────────

Shared account functionality for authenticated users,
regardless of role level.

Use this controller for account/profile actions that apply to:
• Buyers
• Sellers
• Admins

NOT responsible for:
• Login/register logic → authController
• Buyer bookings → buyerBookingsController
• Seller listings → sellerListingController
• Seller bookings → sellerBookingController
• Admin moderation → adminListingController
• Role-specific activity dashboards

Related Routes:
GET    /api/users/profile
PUT    /api/users/profile
PATCH  /api/users/password
PATCH  /api/users/role
DELETE /api/users/account

*/

/* MOVE THE ABOVE COMMENT To docs/ once code is implemented, 
as it only serves as guidelines for development and is not needed in the final codebase. */


/*
─────────────────────────────────────────────────────────────
USE THE FOLLOWING FUNCTION AND ROUTE SIGNATURES FOR THIS CONTROLLER

getUserProfile()
GET /api/users/profile

updateUserProfile()
PUT /api/users/profile

changeUserPassword()
PATCH /api/users/password

requestRoleChange()
PATCH /api/users/role

deleteUserAccount()
DELETE /api/users/account

*/