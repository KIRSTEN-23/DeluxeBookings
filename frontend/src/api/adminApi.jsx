import api from "./config";

export const getAdminListings = async () => {
  const response = await api.get("/admin/listings");
  return response.data;
};

export const getListingsInReview = async () => {
  const response = await api.get("/admin/listings/review");
  return response.data;
};

export const getAdminListingById = async (id) => {
  const response = await api.get(`/admin/listings/${id}`);
  return response.data;
};

export const approveListing = async (id, notes = "") => {
  const response = await api.patch(`/admin/listings/${id}/approve`, { notes });
  return response.data;
};

export const rejectListing = async (id, notes = "") => {
  const response = await api.patch(`/admin/listings/${id}/reject`, { notes });
  return response.data;
};