import api from "./config";

export const getSellerListings = async () => {
  const response = await api.get("/seller/listings");
  return response.data;
};

export const getSellerListingById = async (id) => {
  const response = await api.get(`/seller/listings/${id}`);
  return response.data;
};

export const createSellerListing = async (listingData) => {
  const response = await api.post("/seller/listings", listingData);
  return response.data;
};

export const updateSellerListing = async (id, listingData) => {
  const response = await api.put(`/seller/listings/${id}`, listingData);
  return response.data;
};

export const publishSellerListing = async (id) => {
  const response = await api.patch(`/seller/listings/${id}/publish`);
  return response.data;
};

export const unpublishSellerListing = async (id) => {
  const response = await api.patch(`/seller/listings/${id}/unpublish`);
  return response.data;
};

export const deleteSellerListing = async (id) => {
  const response = await api.delete(`/seller/listings/${id}`);
  return response.data;
};