export const propertyTypeValue = (value = "") => ({ "hotel room": "hotel", guesthouse: "guest_house" }[value.toLowerCase()] || value.toLowerCase().replaceAll(" ", "_"));

export function validateListing(form, step) {
  const checks = [
    [0, Boolean(form.propertyType), "Choose a property type."],
    [1, form.propertyName?.trim().length >= 3 && form.propertyName.trim().length <= 100, "Enter a property name of 3–100 characters."],
    [1, form.description?.trim().length >= 30 && form.description.trim().length <= 1500, "Enter a description of 30–1500 characters."],
    [2, Boolean(form.city?.trim()), "Enter the property's city."],
    [3, form.bedrooms !== "" && Number.isInteger(Number(form.bedrooms)) && Number(form.bedrooms) >= 0 && Number(form.bedrooms) <= 30, "Enter 0–30 bedrooms."],
    [3, form.bathrooms !== "" && Number.isInteger(Number(form.bathrooms)) && Number(form.bathrooms) >= 0 && Number(form.bathrooms) <= 30, "Enter 0–30 bathrooms."],
    [3, Number.isInteger(Number(form.guestCapacity)) && Number(form.guestCapacity) >= 1 && Number(form.guestCapacity) <= 50, "Enter a guest capacity of 1–50."],
    [4, Number.isFinite(Number(form.pricePerNight)) && Number(form.pricePerNight) >= 1, "Enter a nightly price of at least R1."],
    [5, form.images?.length > 0 && form.images.length <= 20, "Add between 1 and 20 property photos."],
  ];
  const invalid = checks.find(([index, valid]) => !valid && (step === undefined || index === step));
  return invalid ? { step: invalid[0], message: invalid[2] } : null;
}
