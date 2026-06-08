/*
─────────────────────────────────────────────────────────────
ABOUT constants.js
─────────────────────────────────────────────────────────────

PURPOSE
Central location for application-wide constant values.
This file exists to prevent "magic strings" and duplicated
values throughout the codebase.

Example:

BAD:
if (listing.status === 'published')
const STATUS = 'published'

GOOD:
if (listing.status === LISTING_STATUS.PUBLISHED)
const { LISTING_STATUS } = require('../config/constants')

Benefits:
• Prevents spelling mistakes
• Makes refactoring easier
• Keeps values consistent across models, controllers, middleware, and frontend
• Creates a single source of truth

USE:
Use constants when defining Mongoose enums.
Example:
status: {
  type: String,
  enum: Object.values(LISTING_STATUS),
  default: LISTING_STATUS.IN_REVIEW
}

IMPORTANT:
This file should contain BUSINESS RULES ONLY, not random project values.

GOOD:
LISTING_STATUS
BOOKING_STATUS
USER_LEVELS


BAD:
SIDEBAR_WIDTH
PRIMARY_BUTTON_TEXT
HERO_HEADING

UI constants belong in the frontend.

*/