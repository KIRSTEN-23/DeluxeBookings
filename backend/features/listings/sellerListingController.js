const Listing = require("./listingSchema");
const { LISTING_STATUS } = require("../../_config/constants");
const getSellerListings = async (req, res) => {
  try {
    const sellerId = req.user.id;

    const listings = await Listing.find({ seller: sellerId }).sort({
      createdAt: -1,
    });


    res.status(200).json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch seller listings." });
  }
};

const getSellerListingById = async (req, res) => {
  try {
    const sellerId = req.user.id;

    const listing = await Listing.findOne({
      _id: req.params.id,
      seller: sellerId,
    });

    if (!listing) {
      return res.status(404).json({ message: "Listing not found." });
    }

    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch seller listing." });
  }
};

const createSellerListing = async (req, res) => {
  try {
    const sellerId = req.user.id;

    const listing = await Listing.create({
      ...pickListingFields(req.body),
      seller: sellerId,
      status: LISTING_STATUS.IN_REVIEW,
    });

    res.status(201).json(listing);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create listing.",
      error: error.message,
    });
  }
};

const editableFields = ["title", "description", "propertyType", "location", "images", "pricePerNight", "guestCapacity", "bedrooms", "bathrooms", "beds", "area", "amenities", "houseRules", "tags"];
const pickListingFields = (body) => Object.fromEntries(editableFields.filter((key) => Object.hasOwn(body, key)).map((key) => [key, body[key]]));

const updateSellerListing = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(400).json({
      message: "Failed to update listing.",
      error: error.message,
    });
  }
};

const publishSellerListing = async (req, res) => {
  try {
    const sellerId = req.user.id;

    const listing = await Listing.findOneAndUpdate(
      {
        _id: req.params.id,
        seller: sellerId,
        status: LISTING_STATUS.UNPUBLISHED,
      },
      {
        status: LISTING_STATUS.PUBLISHED,
        isPaused: false,
      },
      { new: true },
    );

    if (!listing) {
      return res.status(400).json({
        message: "Only approved unpublished listings can be published.",
      });
    }

    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ message: "Failed to publish listing." });
  }
};

const unpublishSellerListing = async (req, res) => {
  try {
    const sellerId = req.user.id;

    const listing = await Listing.findOneAndUpdate(
      {
        _id: req.params.id,
        seller: sellerId,
        status: LISTING_STATUS.PUBLISHED,
      },
      {
        status: LISTING_STATUS.UNPUBLISHED,
      },
      { new: true },
    );

    if (!listing) {
      return res.status(404).json({ message: "Listing not found." });
    }

    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ message: "Failed to unpublish listing." });
  }
};

const resubmitSellerListing = async (req, res) => {
  try {
    const listing = await Listing.findOneAndUpdate(
      { _id: req.params.id, seller: req.user.id, status: LISTING_STATUS.REJECTED },
      { $set: { status: LISTING_STATUS.IN_REVIEW } },
      { new: true, runValidators: true },
    );
    if (!listing) return res.status(409).json({ message: "Only rejected listings can be resubmitted." });
    res.json(listing);
  } catch { res.status(400).json({ message: "Could not resubmit listing. Check the listing details and try again." }); }
};

const deleteSellerListing = async (req, res) => {
  try {
    const sellerId = req.user.id;

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
  } catch (error) {
    res.status(500).json({ message: "Failed to delete listing." });
  }
};

module.exports = {
  getSellerListings,
  getSellerListingById,
  createSellerListing,
  updateSellerListing,
  publishSellerListing,
  unpublishSellerListing,
  deleteSellerListing,
  resubmitSellerListing,
};
