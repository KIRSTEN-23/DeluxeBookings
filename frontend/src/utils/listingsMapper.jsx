const buildListingPayload = (formData, status = "in_review") => {
  const amenities = [
    ...(formData.services || []),
    ...(formData.facilities || []),
  ];

  const images = (formData.images || []).map((image, index) => ({
    url: image.url || image.preview || image,
    alt: image.alt || formData.propertyName || "Listing image",
    isCover: index === 0,
  }));

  return {
    title: formData.propertyName,
    description: formData.description,
    propertyType: formData.propertyType?.toLowerCase().replaceAll(" ", "_"),

    location: {
      destination: formData.city || formData.province || "South Africa",
      country: formData.country || "South Africa",
      province: formData.province,
      city: formData.city,
      suburb: formData.suburb,
      streetAddress: formData.streetAddress,
      postalCode: formData.postalCode,
      displayAddress:
        formData.location ||
        [formData.suburb, formData.city].filter(Boolean).join(", "),
    },

    images,
    pricePerNight: Number(formData.pricePerNight),
    guestCapacity: Number(formData.guestCapacity),
    bedrooms: Number(formData.bedrooms),
    bathrooms: Number(formData.bathrooms),
    beds: formData.beds,
    area: Number(formData.area) || 0,
    amenities,
    houseRules: [
      ...(formData.additionalRules ? [formData.additionalRules] : []),
      ...(formData.checkInTime ? [`Check-in after ${formData.checkInTime}`] : []),
      ...(formData.checkOutTime ? [`Check-out before ${formData.checkOutTime}`] : []),
    ],
    tags: formData.tags || [],
    status,
    isPaused: false,
  };
};