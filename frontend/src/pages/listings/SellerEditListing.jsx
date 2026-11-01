import { validateListing, propertyTypeValue } from "../../utils/listingValidation";
import { errorMessage as getErrorMessage } from "../../utils/feedback";
import { useEffect, useRef, useState } from "react";
import { Alert, Container, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import ListingForm, {
  initialListingForm,
} from "../../components/listings/ListingForm.jsx";

import {
  getSellerListingById,
  updateSellerListing,
  resubmitSellerListing,
} from "../../api/sellerApi.jsx";

import "../../styles/ListingForm.css";

const mapListingToForm = (listing) => ({
  ...initialListingForm,
  propertyName: listing.title || "",
  propertyType: listing.propertyType || "",
  description: listing.description || "",
  streetAddress: listing.location?.streetAddress || "",
  suburb: listing.location?.suburb || "",
  city: listing.location?.city || "",
  province: listing.location?.province || "",
  country: listing.location?.country || "",
  postalCode: listing.location?.postalCode || "",
  location: listing.location?.displayAddress || "",
  bedrooms: listing.bedrooms || "",
  bathrooms: listing.bathrooms || "",
  guestCapacity: listing.guestCapacity || "",
  beds: listing.beds || "",
  area: listing.area || "",
  pricePerNight: listing.pricePerNight || "",
  images: listing.images || [],
  facilities: listing.amenities || [],
  tags: listing.tags || [],
  additionalRules: listing.houseRules?.join("\n") || "",
});

const buildListingPayload = (formData) => {
  const images = (formData.images || []).map((image, index) => ({
    url: image.url || image.preview || image,
    alt: image.alt || formData.propertyName || "Listing image",
    isCover: index === 0,
  }));

  return {
    title: formData.propertyName,
    description: formData.description,
    propertyType: propertyTypeValue(formData.propertyType),
    location: {
      destination: formData.city || formData.province || "South Africa",
      country: formData.country || "South Africa",
      province: formData.province,
      city: formData.city,
      suburb: formData.suburb,
      streetAddress: formData.streetAddress,
      postalCode: formData.postalCode,
      displayAddress:
        formData.location ||
        [formData.suburb, formData.city].filter(Boolean).join(", "),
    },
    images,
    pricePerNight: Number(formData.pricePerNight),
    guestCapacity: Number(formData.guestCapacity),
    bedrooms: Number(formData.bedrooms),
    bathrooms: Number(formData.bathrooms),
    beds: formData.beds,
    area: Number(formData.area) || 0,
    amenities: [
      ...(formData.services || []),
      ...(formData.facilities || []),
    ],
    houseRules: formData.additionalRules
      ? formData.additionalRules.split("\n").filter(Boolean)
      : [],
    tags: formData.tags || [],
  };
};

export default function SellerEditListing() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [listingStatus, setListingStatus] = useState("");
  const [reviewNotes, setReviewNotes] = useState("");
  const [loadFailed, setLoadFailed] = useState(false);
  const [formData, setFormData] = useState(initialListingForm);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitting = useRef(false);

  useEffect(() => {
    const loadListing = async () => {
      try {
        const listing = await getSellerListingById(id);
        setFormData(mapListingToForm(listing));
        setListingStatus(listing.status);
        setReviewNotes(listing.adminReview?.notes || "");
      } catch (error) {
        console.error(error);
        setLoadFailed(true);
        setErrorMessage("Could not load this listing. Please return to your listings and try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadListing();
  }, [id]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdate = async () => {
    if (submitting.current || loadFailed) return;
    const invalid = validateListing(formData);
    if (invalid) { setErrorMessage(invalid.message); return; }
    submitting.current = true;
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      const payload = buildListingPayload(formData);
      await updateSellerListing(id, payload);
      if (listingStatus === "rejected") await resubmitSellerListing(id);
      navigate("/seller/account", { state: { message: listingStatus === "rejected" ? "Listing resubmitted for review." : "Listing changes saved." } });
    } catch (error) {
      console.error(error);
      setErrorMessage(getErrorMessage(error, "Could not save this listing. Your changes are still here; please try again."));
    } finally { submitting.current = false; setIsSubmitting(false); }
  };

  if (isLoading) {
    return (
      <main className="create-listing-page">
        <Container fluid="lg" className="d-flex gap-2 align-items-center py-5">
          <Spinner animation="border" size="sm" />
          Loading listing...
        </Container>
      </main>
    );
  }

  return (
    <main className="create-listing-page">
      <Container fluid="lg">
        {errorMessage && (
          <Alert variant="danger">
            {errorMessage}
          </Alert>
        )}

        {listingStatus === "rejected" && <Alert variant="warning">Changes requested: {reviewNotes || "Review and correct your listing before resubmitting."}</Alert>}
        <ListingForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleUpdate}
          isSubmitting={isSubmitting || loadFailed}
          submitLabel={isSubmitting ? "Saving…" : listingStatus === "rejected" ? "Save and resubmit for review" : "Update listing"}
        />
      </Container>
    </main>
  );
}