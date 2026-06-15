import api from "./config";

export const getAdminListings = async () => {
  const response = await api.get("/listings/admin/all");
  return response.data;
};

export const getListingsInReview = async () => {
  const response = await api.get("/listings/admin/review");
  return response.data;
};

export const getAdminListingById = async (id) => {
  const response = await api.get(`/listings/admin/review/${id}`);
  return response.data;
};

export const approveListing = async (id, notes = "") => {
  const response = await api.patch(`/listings/admin/review/${id}/approve`, {
    notes,
  });

  return response.data;
};

export const rejectListing = async (id, notes = "") => {
  const response = await api.patch(`/listings/admin/review/${id}/reject`, {
    notes,
  });

  return response.data;
};