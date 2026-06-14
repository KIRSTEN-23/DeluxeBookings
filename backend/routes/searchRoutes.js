router.get('/listings/search', async (req, res) => {
    try {
        const { guestCapacity, propertyType, province, city, bedrooms, ratingAverage, amenities } = req.query;
        let queryFilter = {};

        // Search bar
        if (guestCapacity && guestCapacity !== "") queryFilter.guestCapacity = Number(guestCapacity);

        if (propertyType && propertyType !== "")   queryFilter.propertyType = propertyType;

        if (province && province !== "")           queryFilter['location.province'] = province;
        
        if (city && city !== "")                   queryFilter['location.city'] = city;

        // Handles multiple selections
        if (bedrooms) {
            const bedArray = bedrooms.split(',').map(Number);
            queryFilter.bedrooms = { $in: bedArray };
        }

        // Handles multiple selections
        if (ratingAverage) {
            const ratingArray = ratingAverage.split(',').map(Number);
            queryFilter.ratingAverage = { $in: ratingArray };
        }

        // Handles multiple selections
        if (amenities) {
            const amenityArray = amenities.split(',');
            queryFilter.amenities = { $all: amenityArray }; // all checked amenities are necessary
        }

        const listings = await Listing.find(queryFilter);
        return res.status(200).json(listings);

    } catch (error) {
        return res.status(500).json({ error: "Failed to execute filtered query search." });
    }
});