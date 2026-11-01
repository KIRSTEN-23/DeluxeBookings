import { useEffect, useState } from "react";
import { getSellerListingById } from "../../api/sellerApi";
import { getAdminListingById } from "../../api/adminApi";
import { Link, useParams } from "react-router-dom";

import {
  ListingAmenities,
  ListingDescription,
  ListingFacts,
  ListingGallery,
  ListingHostInfo,
  ListingHouseRules,
  ListingLocation,
  ListingPrice,
  ListingPropertyType,
  ListingStatus,
  ListingTags,
  ListingTitle,
} from "../../components/listings/ListingItems.jsx";

import "../../styles/ListingDetails.css";

export default function SellerAdminListingDetails({
  listing,
  listings = [],
  role = "seller",
  isPane = false,
  onClose,
  onUnpublish,
  onPublish,
  pending,
  onDelete,
}) {
  const { id } = useParams();

  const [loadedListing, setLoadedListing] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(!listing && Boolean(id));
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    if (listing || !id) return;
    let active = true;
    setLoading(true);
    setError("");
    const load = role === "admin" ? getAdminListingById : getSellerListingById;
    load(id).then((data) => { if (active) setLoadedListing(data); })
      .catch((err) => { if (active) setError(err.response?.status === 404 ? "Listing not found." : "Could not load listing. Please try again."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id, listing, role, attempt]);
  const selectedListing = listing || listings.find((item) => item._id === id) || loadedListing;
  if (loading) return <p role="status">Loading listing…</p>;
  if (error) return <div><p role="alert">{error}</p><button onClick={() => setAttempt((n) => n + 1)}>Retry</button></div>;

  if (!selectedListing) {
    return (
      <main className="listing-detail-page">
        <div className="container py-4">
          <div className="alert alert-light border mb-0">
            Listing not found.
          </div>
        </div>
      </main>
    );
  }

  const Wrapper = isPane ? "aside" : "main";

  return (
    <Wrapper
      className={
        isPane
          ? "seller-listing-detail-pane listing-detail-pane listing-detail-card"
          : "listing-detail-page"
      }
    >
      <div className={isPane ? "" : "container py-4"}>
        {isPane && (
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="badge bg-light text-dark border">{role} view</span>

            <button
              type="button"
              className="btn btn-outline-dark btn-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        )}

        <ListingGallery
          images={selectedListing.images}
          title={selectedListing.title}
        />

        <div className="listing-detail-header mt-3">
          <ListingTitle title={selectedListing.title} />

          <div className="d-flex gap-2 flex-wrap align-items-center mt-2">
            <ListingLocation location={selectedListing.location} />

            <ListingPropertyType propertyType={selectedListing.propertyType} />

            <ListingStatus status={selectedListing.status} />
          </div>
        </div>

        {selectedListing.adminReview?.notes && <div className="alert alert-info"><strong>Admin feedback:</strong> {selectedListing.adminReview.notes}</div>}
        {selectedListing.status === "in_review" && <p role="status">Awaiting admin review. No action is needed yet.</p>}
        {selectedListing.status === "unpublished" && <p>Approved and ready to publish. This listing is not visible to guests yet.</p>}
        <hr />

        <ListingFacts
          guests={selectedListing.guestCapacity}
          bedrooms={selectedListing.bedrooms}
          bathrooms={selectedListing.bathrooms}
          size={selectedListing.area}
        />

        <div className="my-3">
          <ListingPrice
            price={selectedListing.pricePerNight}
            oldPrice={selectedListing.oldPrice}
          />
        </div>

        <ListingDescription description={selectedListing.description} />

        <hr />

        <ListingAmenities amenities={selectedListing.amenities} />

        <hr />

        <ListingTags tags={selectedListing.tags} />

        <hr />

        <ListingHostInfo
          host={selectedListing.host}
          seller={selectedListing.seller}
        />

        <hr />

        <ListingHouseRules rules={selectedListing.houseRules} />

        {role === "seller" && (
          <>
            <hr />

            <div className="d-flex gap-2 flex-wrap">
              {selectedListing.status === "published" && (
                <>
                  <Link
                    to={`/seller/listings/${selectedListing._id}/edit`}
                    className="btn btn-outline-dark"
                  >
                    Edit listing
                  </Link>

                  <button
                    disabled={pending}
                    type="button"
                    className="btn btn-outline-warning"
                    onClick={() => onUnpublish?.(selectedListing._id)}
                  >
                    Unpublish
                  </button>
                </>
              )}

              {selectedListing.status === "unpublished" && (
                <>
                  <button
                    disabled={pending}
                    type="button"
                    className="btn btn-outline-success"
                    onClick={() => onPublish?.(selectedListing._id)}
                  >
                    Publish
                  </button>

                  <button
                    disabled={pending}
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => onDelete?.(selectedListing._id)}
                  >
                    Delete permanently
                  </button>
                </>
              )}

              {selectedListing.status === "draft" && (
                <>
                  <Link
                    to={`/seller/listings/${selectedListing._id}/edit`}
                    className="btn btn-outline-dark"
                  >
                    Continue editing
                  </Link>

                  <button
                    disabled={pending}
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => onDelete?.(selectedListing._id)}
                  >
                    Delete permanently
                  </button>
                </>
              )}

              {selectedListing.status === "rejected" && (
                <>
                  <Link
                    to={`/seller/listings/${selectedListing._id}/edit`}
                    className="btn btn-outline-dark"
                  >
                    Edit listing
                  </Link>

                  <button
                    disabled={pending}
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => onDelete?.(selectedListing._id)}
                  >
                    Delete permanently
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </Wrapper>
  );
}
