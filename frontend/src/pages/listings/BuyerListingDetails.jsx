import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "../../Components/public/ReviewForm";

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

  useEffect(() => {
    const loadListing = async () => {
      const data = await getPublicListingById(id);

      setListing(data);

      setIsLoading(false);
    };

    loadListing();
  }, [id]);

  if (isLoading) return <p>Loading listing...</p>;

  if (errorMessage) return <p>{errorMessage}</p>;

  if (!listing) {
    return (
      <main className="listing-detail-page">
        <div className="container">
          <div className="alert alert-light border">Listing not found.</div>
        </div>
      </main>
    );
  }

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

              <button className="btn btn-primary reserve-button w-100" onClick={() => window.location.href = '/checkout'}>
                Book Now
              </button>
            </section>

            <ListingHostInfo host={listing.host} />
          </aside>
        </div>
          <ReviewForm/>
      </div>
    </main>
  );
}
