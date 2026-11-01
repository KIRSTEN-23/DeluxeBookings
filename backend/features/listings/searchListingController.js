const Listing = require("./listingSchema");
const { PROPERTY_TYPES } = require("../../_config/constants");

const searchListings = async (req, res) => {
  try {
    const { guestCapacity, propertyType, province, city, bedrooms, amenities } = req.query;
    const filter = { status: "published", isPaused: false };
    if (guestCapacity) {
      const count = Number(guestCapacity);
      if (!Number.isInteger(count) || count < 1 || count > 50) return res.status(400).json({ message: "Choose a guest count from 1 to 50." });
      filter.guestCapacity = { $gte: count };
    }
    if (propertyType) {
      if (typeof propertyType !== "string" || !Object.values(PROPERTY_TYPES).includes(propertyType)) return res.status(400).json({ message: "Choose a valid property type." });
      filter.propertyType = propertyType;
    }
    for (const [field, value] of [["province", province], ["city", city]]) {
      if (value) {
        if (typeof value !== "string") return res.status(400).json({ message: "Choose a valid location." });
        filter[`location.${field}`] = value;
      }
    }
    if (bedrooms) {
      if (typeof bedrooms !== "string") return res.status(400).json({ message: "Choose valid bedroom counts." });
      const counts = bedrooms.split(",").map(Number);
      if (counts.some((n) => !Number.isInteger(n) || n < 1 || n > 4)) return res.status(400).json({ message: "Choose valid bedroom counts." });
      filter.$or = counts.map((count) => ({ bedrooms: count === 4 ? { $gte: 4 } : count }));
    }
    if (amenities) {
      if (typeof amenities !== "string") return res.status(400).json({ message: "Choose valid amenities." });
      filter.amenities = { $all: amenities.split(",") };
    }
    res.json(await Listing.find(filter).sort({ createdAt: -1 }));
  } catch { res.status(500).json({ message: "Could not search listings. Please try again." }); }
};
module.exports = { searchListings };
