import ContentState from "../../components/common/ContentState.jsx";
import { House, TriangleAlert } from "lucide-react";
import AppButton from "../../components/common/AppButton.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "../../components/public/ReviewForm";

import { getPublicListingById } from "../../api/publicApi";

import {
  ListingTitle,
  ListingDescription,
  ListingLocation,
  ListingPropertyType,
  ListingRating,
  ListingFacts,
  ListingAmenities,
  ListingTags,
  ListingPrice,
  ListingGallery,
  ListingHostInfo,
  ListingHouseRules,
} from "../../components/listings/ListingItems";

import "../../styles/ListingDetails.css";

export default function BuyerListingDetails() {
  const { id } = useParams();

  const [listing, setListing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setErrorMessage("");
    setListing(null);
    getPublicListingById(id).then((data) => {
      if (active) setListing(data);
    }).catch((error) => {
      if (active) setErrorMessage(error.response?.status === 404 ? "This listing is no longer available." : "Could not load this listing. Please try again.");
    }).finally(() => { if (active) setIsLoading(false); });
    return () => { active = false; };
  }, [id, attempt]);

  if (isLoading) return <main className="container py-4"><ContentState busy framed heading="Opening this property" description="We’re loading the property details and photos." actionLabel="Loading property…" /></main>;

  if (errorMessage) return <main className="container py-4"><ContentState error framed icon={TriangleAlert} heading="This stay couldn’t open" description={errorMessage} actionLabel="Browse available stays" to="/product" /></main>;
  if (!listing) return <main className="container py-4"><ContentState framed icon={House} heading="This property is unavailable" description="It may have been removed from the catalogue. Explore the stays currently available." actionLabel="Browse stays" to="/product" /></main>;

  return (
    <main className="listing-detail-page">
      <div className="container listing-detail-shell">
        <ListingGallery images={listing.images} title={listing.title} />

        <section className="listing-detail-hero">
          <ListingTitle title={listing.title} level="h1" />

          <div className="listing-meta-row">
            <ListingLocation location={listing.location} />
            <ListingPropertyType propertyType={listing.propertyType} />
            <ListingRating
              rating={listing.rating}
              reviewCount={listing.reviewCount}
            />
          </div>
        </section>

        <div className="listing-detail-content-grid">
          <div className="listing-detail-main-content">
            <section className="listing-detail-card">
              <h2>About this place</h2>

              <ListingFacts
                guests={listing.guestCapacity}
                bedrooms={listing.bedrooms}
                bathrooms={listing.bathrooms}
                size={listing.area}
              />

              <hr />

              <ListingDescription description={listing.description} />
            </section>

            <section className="listing-detail-card">
              <h2>Amenities</h2>
              <ListingAmenities amenities={listing.amenities} />
            </section>

            <section className="listing-detail-card">
              <h2>Tags</h2>
              <ListingTags tags={listing.tags} />
            </section>

            <section className="listing-detail-card">
              <h2>House Rules</h2>
              <ListingHouseRules rules={listing.houseRules} />
            </section>
          </div>

          <aside className="listing-detail-sidebar">
            <section className="booking-card">
              <ListingPrice
                price={listing.pricePerNight}
                oldPrice={listing.oldPrice}
              />

              <hr />

              <AppButton intent="primary" appearance="fill" className="w-100" onClick={() => window.location.href = `/checkout?listing=${listing._id}`}>
                Book Now
              </AppButton>
            </section>

            <ListingHostInfo host={listing.host} />
          </aside>
        </div>
          <ReviewForm/>
      </div>
    </main>
  );
}
