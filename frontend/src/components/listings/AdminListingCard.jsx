import { Users } from "lucide-react";
import AppButton from "../common/AppButton.jsx";
import { ListingLocation, ListingPropertyType, ListingStatus } from "./ListingItems.jsx";

export default function AdminListingCard({ listing, isActive, onView, onApprove, onReject, pending }) {
  return (
    <div className={`admin-queue-row ${isActive ? "is-active" : ""}`}>
      <div className="admin-queue-heading">
        <div className="admin-queue-title">
          <strong>{listing.title}</strong>
          <ListingLocation location={listing.location || "No location"} />
        </div>
        <div className="admin-queue-badges">
          <ListingPropertyType propertyType={listing.propertyType} />
          <ListingStatus status={listing.status} />
        </div>
      </div>

      <div className="admin-queue-meta">
        <strong>R{listing.pricePerNight?.toLocaleString() || 0}/night</strong>
        <span><Users size={18} aria-hidden="true" /> {listing.guestCapacity ?? listing.maxGuests ?? 0} guests</span>
      </div>

      <div className="admin-queue-actions">
        <AppButton intent="neutral" appearance="fill" onClick={() => onView(listing)}>View</AppButton>
        <AppButton intent="success" appearance="outline" disabled={pending} onClick={() => onApprove(listing._id)}>Approve</AppButton>
        <AppButton intent="danger" appearance="outline" disabled={pending} onClick={() => onReject(listing._id)}>Reject</AppButton>
      </div>
    </div>
  );
}
