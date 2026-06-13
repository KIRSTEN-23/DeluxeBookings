import api from "./config";

export const getPublicListings = async () => {
  const response = await api.get("/public/listings");
  return response.data;
};

export const getPublicListingById = async (id) => {
  const response = await api.get(`/public/listings/${id}`);
  return response.data;
};