const LISTING_DRAFT_KEY = "deluxe_listing_draft";

export const getListingDraft = () => {
  try {
    const draft = localStorage.getItem(LISTING_DRAFT_KEY);
    return draft ? JSON.parse(draft) : null;
  } catch {
    return null;
  }
};

export const saveListingDraft = (draft) => {
  localStorage.setItem(LISTING_DRAFT_KEY, JSON.stringify(draft));
};

export const clearListingDraft = () => {
  localStorage.removeItem(LISTING_DRAFT_KEY);
};