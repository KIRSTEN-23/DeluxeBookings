import { useState } from "react";
import { Button, Container, Form, ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import {
  initialListingForm,
  ListingFormSection,
  listingFormSteps,
} from "../../components/listings/ListingForm.jsx";

import { createSellerListing } from "../../api/sellerApi.jsx";

import {
  getListingDraft,
  saveListingDraft,
  clearListingDraft,
} from "../../utils/listingStorage.jsx";

import "../../styles/listingForm.css";

const buildListingPayload = (formData, status = "in_review") => {
  const amenities = [
    ...(formData.services || []),
    ...(formData.facilities || []),
  ];

  const images = (formData.images || []).map((image, index) => ({
    url: image.url || image.preview || image,
    alt: image.alt || formData.propertyName || "Listing image",
    isCover: index === 0,
  }));

  return {
    title: formData.propertyName,
    description: formData.description,
    propertyType: formData.propertyType?.toLowerCase().replaceAll(" ", "_"),
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
    amenities,
    houseRules: [
      ...(formData.additionalRules ? [formData.additionalRules] : []),
      ...(formData.checkInTime ? [`Check-in after ${formData.checkInTime}`] : []),
      ...(formData.checkOutTime ? [`Check-out before ${formData.checkOutTime}`] : []),
    ],
    tags: formData.tags || [],
    status,
    isPaused: false,
  };
};

export default function SellerCreateListing() {
  const navigate = useNavigate();
  const savedDraft = getListingDraft();

  const [currentStep, setCurrentStep] = useState(savedDraft?.currentStep || 0);
  const [formData, setFormData] = useState({
    ...initialListingForm,
    ...(savedDraft?.formData || {}),
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveDraft = () => {
    saveListingDraft({ formData, currentStep });
    navigate("/seller/account");
  };

  const handleSubmit = async () => {
    try {
      const payload = buildListingPayload(formData, "in_review");
      await createSellerListing(payload);
      clearListingDraft();
      navigate("/seller/account");
    } catch (error) {
      console.error(error);
      setErrorMessage("Could not create listing.");
    }
  };

  const goNext = () => {
    setCurrentStep((step) => Math.min(step + 1, listingFormSteps.length - 1));
  };

  const goBack = () => {
    setCurrentStep((step) => Math.max(step - 1, 0));
  };

  const stepNumber = currentStep + 1;
  const totalSteps = listingFormSteps.length;

  return (
    <main className="create-listing-page">
      <Container fluid="lg" className="create-listing-shell">
        <div className="intake-page-heading">
          <h1 className="intake-page-title">List Your Property</h1>
          <p className="form-subtitle">
            Complete the intake form and submit your listing for review.
          </p>
        </div>

        {errorMessage && (
          <div className="alert alert-danger">
            {errorMessage}
          </div>
        )}

        <p className="step-text">
          Progress: {stepNumber}/{totalSteps}
        </p>

        <ProgressBar
          className="progress-bar-outer"
          now={(stepNumber / totalSteps) * 100}
        />

        <Form className="fields-grid intake-step-form">
          <ListingFormSection
            step={currentStep}
            formData={formData}
            onChange={handleChange}
          />

          <div className="form-actions">
            <Button
              type="button"
              className="secondary-button"
              onClick={handleSaveDraft}
            >
              Save draft
            </Button>

            <div className="action-group">
              {currentStep > 0 && (
                <Button
                  type="button"
                  className="back-button"
                  onClick={goBack}
                >
                  Back
                </Button>
              )}

              {currentStep < totalSteps - 1 ? (
                <Button
                  type="button"
                  className="continue-button"
                  onClick={goNext}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  type="button"
                  className="publish-button"
                  onClick={handleSubmit}
                >
                  Submit for review
                </Button>
              )}
            </div>
          </div>
        </Form>
      </Container>
    </main>
  );
}