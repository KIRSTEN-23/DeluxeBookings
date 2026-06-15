import api from "./config";

export const getPublicListings = async () => {
  const response = await api.get("/public/browse");
  return response.data;
};

export const getPublicListingById = async (id) => {
  const response = await api.get(`/public/browse/${id}`);
  return response.data;
};