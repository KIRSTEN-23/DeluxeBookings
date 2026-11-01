import AppButton from "../../components/common/AppButton.jsx";
import { validateListing, propertyTypeValue } from "../../utils/listingValidation";
import { errorMessage as getErrorMessage } from "../../utils/feedback";
import { useRef, useState } from "react";
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

import "../../styles/ListingForm.css";

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
  const [savedDraft] = useState(getListingDraft);

  const [currentStep, setCurrentStep] = useState(savedDraft?.currentStep || 0);
  const [formData, setFormData] = useState({
    ...initialListingForm,
    ...(savedDraft?.formData || {}),
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitting = useRef(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveDraft = () => {
    try {
      saveListingDraft({ formData, currentStep });
      navigate("/account/activity", { state: { message: "Draft saved on this device. Use Resume draft to continue." } });
    } catch {
      setErrorMessage("Could not save the draft on this device. Browser storage may be full. Your details are still in this form.");
    }
  };

  const handleSubmit = async () => {
    if (submitting.current) return;
    const invalid = validateListing(formData);
    if (invalid) { setCurrentStep(invalid.step); setErrorMessage(invalid.message); return; }
    submitting.current = true;
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      const payload = buildListingPayload(formData, "in_review");
      await createSellerListing(payload);
      try { clearListingDraft(); } catch { /* Submission succeeded even if browser storage cannot be cleared. */ }
      navigate("/account/activity", { state: { message: "Listing submitted for review. You can check its status here." } });
    } catch (error) {
      console.error(error);
      setErrorMessage(getErrorMessage(error, "Could not submit listing. Your details are still here; please try again."));
    } finally { submitting.current = false; setIsSubmitting(false); }
  };

  const goNext = () => {
    const invalid = validateListing(formData, currentStep);
    if (invalid) { setErrorMessage(invalid.message); return; }
    setErrorMessage("");
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
          <div role="alert" className="alert alert-danger">
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

        <Form className="fields-grid intake-step-form" onSubmit={(event) => { event.preventDefault(); if (currentStep < totalSteps - 1) goNext(); else handleSubmit(); }}>
          <fieldset disabled={isSubmitting}>
          <ListingFormSection
            step={currentStep}
            formData={formData}
            onChange={handleChange}
          />

          <div className="form-actions">
            <AppButton intent="secondary" appearance="fill" type="button" onClick={handleSaveDraft}>
              Save draft
            </AppButton>

            <div className="action-group">
              {currentStep > 0 && (
                <AppButton intent="secondary" appearance="outline" type="button" onClick={goBack}>
                  Back
                </AppButton>
              )}

              {currentStep < totalSteps - 1 ? (
                <AppButton intent="primary" appearance="fill" type="button" onClick={goNext}>
                  Continue
                </AppButton>
              ) : (
                <AppButton intent="primary" appearance="fill" type="button" onClick={handleSubmit}>
                  {isSubmitting ? "Submitting…" : "Submit for review"}
                </AppButton>
              )}
            </div>
          </div>
          </fieldset>
        </Form>
      </Container>
    </main>
  );
}