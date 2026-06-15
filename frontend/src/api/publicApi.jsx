import api from "./config";

export const getPublicListings = async () => {
  const response = await api.get("/listings/browse");
  return response.data;
};

export const getPublicListingById = async (id) => {
  const response = await api.get(`/listings/browse/${id}`);
  return response.data;
};