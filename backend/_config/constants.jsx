/*
─────────────────────────────────────────────────────────────
ABOUT constants.js
─────────────────────────────────────────────────────────────

docs/constants.md provides the guidelines for this file.

*/


// ─────────────────────────────────────
// USER LEVELS
// Tiered permissions system
// Admin > Seller > Buyer > Public
// ─────────────────────────────────────

const USER_LEVELS = {
  PUBLIC: 0,
  BUYER: 1,
  SELLER: 2,
  ADMIN: 3
};

/*

USER_LEVELS control permissions.

The project uses a tiered access system:

Admin inherits access to all lower-level functionality.
Use USER_LEVELS for authorization checks.

*/

// ─────────────────────────────────────
// USER ROLES
// Display / account purposes
// ─────────────────────────────────────

const USER_ROLES = {
  BUYER: 'buyer',
  SELLER: 'seller',
  ADMIN: 'admin'
};

// ─────────────────────────────────────
// LISTING STATUS
// Seller → Admin Review → Publish flow
// ─────────────────────────────────────

const LISTING_STATUS = {
  DRAFT: 'draft',
  IN_REVIEW: 'in_review',
  PUBLISHED: 'published',
  UNPUBLISHED: 'unpublished',
  REJECTED: 'rejected'
};

// ─────────────────────────────────────
// BOOKING STATUS
// ─────────────────────────────────────

const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed'
};

// ─────────────────────────────────────
// PROPERTY TYPES
// Used in forms, filters, and cards
// ─────────────────────────────────────

const PROPERTY_TYPES = {
  APARTMENT: 'apartment',
  HOTEL: 'hotel',
  VILLA: 'villa',
  PENTHOUSE: 'penthouse',
  RESORT: 'resort',
  CABIN: 'cabin',
  LODGE: 'lodge',
  GUEST_HOUSE: 'guest_house'
};

// ─────────────────────────────────────
// IMAGE SETTINGS
// ─────────────────────────────────────

const MAX_IMAGES_PER_LISTING = 20;

// ─────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────

module.exports = {
  USER_LEVELS,
  USER_ROLES,
  LISTING_STATUS,
  BOOKING_STATUS,
  PROPERTY_TYPES,
  MAX_IMAGES_PER_LISTING
};