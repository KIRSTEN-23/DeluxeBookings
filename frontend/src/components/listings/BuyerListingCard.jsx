import { Link } from "react-router-dom";

import ListingCardShell from "./ListingCardShell";

import {
  ListingTitle,
  ListingDescription,
  ListingLocation,
  ListingPropertyType,
  ListingRating,
  ListingStatus,
  ListingFacts,
  ListingAmenities,
  ListingPrice,
} from "./ListingItems";

export default function BuyerListingCard({ listing }) {
  const coverImage = listing.coverImage || listing.images?.[0];

  return (
    <ListingCardShell
      variant="buyer"
      image={typeof coverImage === "string" ? coverImage : coverImage?.url}
      imageAlt={listing.title}
      badge={listing.isNew ? <span className="listing-pill">New</span> : null}
      actions={
        <>
          <Link
            to={`/browse/${listing._id}`}
            className="btn btn-outline-dark listing-card-action-secondary"
          >
            View Details
          </Link>

          <button className="btn btn-primary listing-card-action-primary">
            Book Now
          </button>
        </>
      }
    >
      <div className="listing-card-content-grid">
        <div className="listing-card-main-content">
          {/* <ListingStatus status={listing.status || "Available"} /> */}

          <ListingTitle title={listing.title} />

          <div className="listing-meta-row">
            <ListingLocation location={listing.location?.displayAddress} />
            <ListingPropertyType propertyType={listing.propertyType} />
          </div>

          <ListingFacts
            guests={listing.guestCapacity}
            bedrooms={listing.bedrooms}
            bathrooms={listing.bathrooms}
            size={listing.area}
          />

          <ListingAmenities amenities={listing.amenities} />

          <ListingDescription description={listing.description} truncate lines={2} />
        </div>

        <aside className="listing-card-sidebar">
          {/* <ListingRating rating={listing.rating} reviewCount={listing.reviewCount} /> */}
          <ListingPrice price={listing.pricePerNight} oldPrice={listing.oldPrice} />
        </aside>
      </div>
    </ListingCardShell>
  );
}