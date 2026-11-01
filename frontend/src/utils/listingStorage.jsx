const draftKey = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return `deluxe_listing_draft_${user?.id || user?._id || "guest"}`;
  } catch { return "deluxe_listing_draft_guest"; }
};

export const getListingDraft = () => {
  try {
    const draft = localStorage.getItem(draftKey());
    return draft ? JSON.parse(draft) : null;
  } catch {
    return null;
  }
};

export const saveListingDraft = (draft) => {
  localStorage.setItem(draftKey(), JSON.stringify(draft));
};

export const clearListingDraft = () => {
  localStorage.removeItem(draftKey());
};