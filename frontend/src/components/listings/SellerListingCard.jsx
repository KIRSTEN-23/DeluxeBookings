import AppButton from "../common/AppButton.jsx";
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
  pending,
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
          <AppButton intent="secondary" appearance="outline" disabled={pending} type="button" onClick={() => onViewDetails?.(listing)}>
            View Details
          </AppButton>

          {status === "published" && (
            <AppButton intent="warning" appearance="outline" disabled={pending} type="button" onClick={() => onUnpublish?.(listing._id)}>
              Unpublish
            </AppButton>
          )}

          {status === "unpublished" && (
            <>
              <AppButton intent="success" appearance="outline" disabled={pending} type="button" onClick={() => onPublish?.(listing._id)}>
                Publish
              </AppButton>

              <AppButton intent="danger" appearance="outline" disabled={pending} type="button" onClick={() => onDelete?.(listing._id)}>
                Delete
              </AppButton>
            </>
          )}

          {status === "draft" && (
            <>
              <AppButton intent="secondary" appearance="outline" as={Link} to={`/seller/listings/${listing._id}/edit`}>
                Continue Editing
              </AppButton>

              <AppButton intent="danger" appearance="outline" disabled={pending} type="button" onClick={() => onDelete?.(listing._id)}>
                Delete
              </AppButton>
            </>
          )}

          {status === "rejected" && (
            <>
              <AppButton intent="secondary" appearance="outline" as={Link} to={`/seller/listings/${listing._id}/edit`}>
                Edit
              </AppButton>

              <AppButton intent="danger" appearance="outline" disabled={pending} type="button" onClick={() => onDelete?.(listing._id)}>
                Delete
              </AppButton>
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
