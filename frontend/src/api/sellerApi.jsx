import api from "./config";

export const getSellerListings = async () => {
  const response = await api.get("/listings/seller/my-listings");
  return response.data;
};

export const getSellerListingById = async (id) => {
  const response = await api.get(`/listings/seller/my-listings/${id}`);
  return response.data;
};

export const createSellerListing = async (listingData) => {
  const response = await api.post("/listings/seller/my-listings", listingData);
  return response.data;
};

export const updateSellerListing = async (id, listingData) => {
  const response = await api.put(
    `/listings/seller/my-listings/${id}`,
    listingData,
  );
  return response.data;
};

export const publishSellerListing = async (id) => {
  const response = await api.patch(
    `/listings/seller/my-listings/${id}/publish`,
  );
  return response.data;
};

export const unpublishSellerListing = async (id) => {
  const response = await api.patch(
    `/listings/seller/my-listings/${id}/unpublish`,
  );
  return response.data;
};

export const deleteSellerListing = async (id) => {
  const response = await api.delete(`/listings/seller/my-listings/${id}`);
  return response.data;
};

// _____________________________________________________________________________

//Booking

export const getSellerBookings = async () => {
  const response = await api.get("/bookings/seller");

  return response.data;
};
