import { Link, useParams } from "react-router-dom";

import {
  ListingTitle,
  ListingDescription,
  ListingLocation,
  ListingPropertyType,
  ListingStatus,
  ListingFacts,
  ListingAmenities,
  ListingTags,
  ListingPrice,
  ListingGallery,
  ListingHostInfo,
  ListingHouseRules,
} from "../../components/listings/ListingItems";

import "../../styles/components/listings/ListingDetails.css";

export default function SellerAdminListingDetails({
  listings = [],
  role = "seller",
  isPane = false,
  onClose,
}) {
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

  const Wrapper = isPane ? "aside" : "main";

  return (
    <Wrapper className={isPane ? "listing-detail-pane" : "listing-detail-page"}>
      <div className={isPane ? "listing-detail-shell" : "container listing-detail-shell"}>
        <div className="listing-detail-actions">
          <ListingStatus status={listing.status} />

          {role === "seller" && (
            <Link
              to={`/seller/listings/${listing._id}/edit`}
              className="btn btn-primary listing-detail-action-primary"
            >
              Edit Listing
            </Link>
          )}

          {role === "admin" && (
            <>
              <button className="btn btn-primary listing-detail-action-primary">
                Approve
              </button>

              <button className="btn listing-detail-action-danger">
                Request Changes
              </button>
            </>
          )}

          {isPane && (
            <button
              type="button"
              className="listing-detail-close"
              onClick={onClose}
              aria-label="Close listing details"
            >
              ×
            </button>
          )}
        </div>

        <ListingGallery images={listing.images} title={listing.title} />

        <section className="listing-detail-hero">
          <ListingTitle title={listing.title} level="h1" />

          <div className="listing-meta-row">
            <ListingLocation location={listing.location} />
            <ListingPropertyType propertyType={listing.propertyType} />
          </div>

          <ListingPrice price={listing.price} oldPrice={listing.oldPrice} />
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
            <ListingHostInfo host={listing.host} />
          </aside>
        </div>
      </div>
    </Wrapper>
  );
}