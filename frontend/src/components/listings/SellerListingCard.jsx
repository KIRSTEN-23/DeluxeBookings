import { Link } from "react-router-dom";

import ListingCardShell from "./ListingCardShell";

import {
  ListingTitle,
  ListingDescription,
  ListingLocation,
  ListingPropertyType,
  ListingStatus,
  ListingFacts,
  ListingAmenities,
  ListingPrice,
} from "./ListingItems";

export default function SellerListingCard({
  listing,
  selected = false,
  onViewDetails,
  onDelete,
  onPublish,
  onUnpublish
}) {
  const coverImage =
    listing.images?.find((image) => image.isCover) || listing.images?.[0];
  const status = listing.status;

  return (
    <ListingCardShell
      variant="seller"
      selected={selected}
      image={typeof coverImage === "string" ? coverImage : coverImage?.url}
      imageAlt={listing.title}
      badge={<ListingPropertyType propertyType={listing.propertyType} />}
      actions={
        <>
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={() => onViewDetails?.(listing)}
          >
            View Details
          </button>

          {status === "published" && (
            <button
              type="button"
              className="btn btn-outline-warning"
              onClick={() => onUnpublish?.(listing._id)}
            >
              Remove
            </button>
          )}

          {status === "unpublished" && (
            <>
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={() => onPublish?.(listing._id)}
              >
                Publish
              </button>

              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => onDelete?.(listing._id)}
              >
                Delete
              </button>
            </>
          )}

          {status === "draft" && (
            <>
              <Link
                to={`/seller/listings/${listing._id}/edit`}
                className="btn btn-outline-dark"
              >
                Continue Editing
              </Link>

              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => onDelete?.(listing._id)}
              >
                Delete
              </button>
            </>
          )}

          {status === "rejected" && (
            <>
              <Link
                to={`/seller/listings/${listing._id}/edit`}
                className="btn btn-outline-dark"
              >
                Edit
              </Link>

              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => onDelete?.(listing._id)}
              >
                Delete
              </button>
            </>
          )}
        </>
      }
    >
      <div className="listing-card-content-grid">
        <div className="listing-card-main-content">
          <ListingStatus status={listing.status} />
          <ListingTitle title={listing.title} />

          <div className="listing-meta-row">
            <ListingLocation location={listing.location} />
          </div>

          <ListingDescription
            description={listing.description}
            truncate
            lines={2}
          />

          <ListingFacts
            guests={listing.guestCapacity}
            bedrooms={listing.bedrooms}
            bathrooms={listing.bathrooms}
            size={listing.area}
          />

          <ListingAmenities amenities={listing.amenities} />
        </div>

        <aside className="listing-card-sidebar">
          <ListingPrice
            price={listing.pricePerNight}
            oldPrice={listing.oldPrice}
          />
        </aside>
      </div>
    </ListingCardShell>
  );
}
