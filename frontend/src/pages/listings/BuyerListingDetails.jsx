import { useParams } from "react-router-dom";

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

import "../../styles/components/listings/ListingDetails.css";

export default function BuyerListingDetails({ listings = [] }) {
  const { id } = useParams();

  const listing = listings.find((item) => item._id === id) || listings[0];

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
            <ListingRating rating={listing.rating} reviewCount={listing.reviewCount} />
          </div>
        </section>

        <div className="listing-detail-content-grid">
          <div className="listing-detail-main-content">
            <section className="listing-detail-card">
              <h2>About this place</h2>

              <ListingFacts
                guests={listing.guests}
                bedrooms={listing.bedrooms}
                bathrooms={listing.bathrooms}
                size={listing.size}
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
              <ListingPrice price={listing.price} oldPrice={listing.oldPrice} />

              <hr />

              <button className="btn btn-primary reserve-button w-100">
                Book Now
              </button>
            </section>

            <ListingHostInfo host={listing.host} />
          </aside>
        </div>
      </div>
    </main>
  );
}