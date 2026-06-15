import { useEffect, useState } from "react";
import { Alert, Container, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import ListingForm, {
  initialListingForm,
} from "../../components/listings/ListingForm.jsx";

import {
  getSellerListingById,
  updateSellerListing,
} from "../../api/sellerApi.jsx";

import "../../styles/listingForm.css";

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

  const [formData, setFormData] = useState(initialListingForm);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadListing = async () => {
      try {
        const listing = await getSellerListingById(id);
        setFormData(mapListingToForm(listing));
      } catch (error) {
        console.error(error);
        setErrorMessage("Could not load this listing.");
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
    try {
      const payload = buildListingPayload(formData);
      await updateSellerListing(id, payload);
      navigate("/seller/account");
    } catch (error) {
      console.error(error);
      setErrorMessage("Could not update this listing.");
    }
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

        <ListingForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleUpdate}
          submitLabel="Update listing"
        />
      </Container>
    </main>
  );
}