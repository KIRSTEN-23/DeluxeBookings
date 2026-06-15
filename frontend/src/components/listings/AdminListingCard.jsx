export default function AdminListingCard({
  listing,
  isActive,
  onView,
  onApprove,
  onReject,
}) {
  return (
    <div className={`admin-queue-row ${isActive ? "is-active" : ""}`}>
      <div className="admin-queue-cell">
        <strong>{listing.title}</strong>
        <span>
          {listing.location?.displayAddress ||
            listing.location?.city ||
            "No location"}
        </span>
      </div>

      <div className="admin-queue-cell">
        {listing.propertyType || "Property"}
      </div>

      <div className="admin-queue-cell">
        {listing.maxGuests || listing.guestCapacity || 0} guests
      </div>

      <div className="admin-queue-cell">
        R{listing.pricePerNight?.toLocaleString() || 0}/night
      </div>

      <div className="admin-queue-cell">
        <span className="admin-status-pill">{listing.status}</span>
      </div>

      <div className="admin-queue-actions">
        <button type="button" onClick={() => onView(listing)}>
          View
        </button>

        <button type="button" onClick={() => onApprove(listing._id)}>
          Approve
        </button>

        <button type="button" onClick={() => onReject(listing._id)}>
          Reject
        </button>
      </div>
    </div>
  );
}