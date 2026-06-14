/*
─────────────────────────────────────────────────────────────
AUTH CONTROLLER
─────────────────────────────────────────────────────────────

Purpose:
Authentication only.

Responsibilities:
• Register users
• Login users
• Issue JWT tokens
• Verify authentication state

NOT responsible for:
• Profile management
• Account updates
• Bookings
• Listings

Related Routes:
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me

─────────────────────────────────────────────────────────────

registerUser()
POST /api/auth/register

loginUser()
POST /api/auth/login

logoutUser()
POST /api/auth/logout

getCurrentUser()
GET /api/auth/me

*/