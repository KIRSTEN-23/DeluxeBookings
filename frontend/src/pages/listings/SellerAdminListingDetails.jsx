import ContentState from "../../components/common/ContentState.jsx";
import { House, TriangleAlert } from "lucide-react";
import AppButton from "../../components/common/AppButton.jsx";
import { useEffect, useRef, useState } from "react";
import { errorMessage as getErrorMessage } from "../../utils/feedback";
import { getSellerListingById, publishSellerListing, unpublishSellerListing, deleteSellerListing } from "../../api/sellerApi";
import { getAdminListingById } from "../../api/adminApi";
import { Link, useNavigate, useParams } from "react-router-dom";

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
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [actionMessage, setActionMessage] = useState("");
  const [actionError, setActionError] = useState("");
  const actionPending = useRef(false);

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
  const act = async (action, listingId, callback) => {
    if (callback) return callback(listingId);
    if (actionPending.current) return;
    if (action === "delete" && !window.confirm("Permanently delete this listing? This cannot be undone.")) return;
    actionPending.current = true;
    setSaving(true);
    setActionMessage("");
    setActionError("");
    setError("");
    try {
      if (action === "delete") {
        await deleteSellerListing(listingId);
        navigate("/account/activity", { state: { message: "Listing permanently deleted." } });
      } else {
        const updated = await (action === "publish" ? publishSellerListing : unpublishSellerListing)(listingId);
        setLoadedListing(updated);
        setActionMessage(action === "publish" ? "Listing published. Guests can now find it." : "Listing unpublished. It is no longer visible to guests.");
      }
    } catch (err) { setActionError(getErrorMessage(err, "Could not change listing. Please try again.")); }
    finally { actionPending.current = false; setSaving(false); }
  };
  if (loading) return <ContentState busy framed heading="Opening your listing" description="We’re loading the property details and review status." actionLabel="Loading listing…" />;
  if (error) return <ContentState error framed icon={TriangleAlert} heading="The listing couldn’t open" description={error} actionLabel="Try again" onAction={() => setAttempt((n) => n + 1)} />;
  if (!selectedListing) return <ContentState framed icon={House} heading="This listing is unavailable" description="Return to your activity to choose a property that is still available." actionLabel="View my activity" to="/account/activity" />;

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
        {saving && <p role="status">Saving listing change…</p>}
        {actionError && <p role="alert" className="text-danger">{actionError}</p>}
        {actionMessage && <p role="status">{actionMessage}</p>}
        {isPane && (
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="badge bg-light text-dark border">{role} view</span>

            <AppButton intent="secondary" appearance="outline" type="button" onClick={onClose}>
              Close
            </AppButton>
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

        <div className="listing-detail-sections">
          <section className="listing-detail-section">
            {selectedListing.status === "in_review" && <p role="status">Awaiting admin review. No action is needed yet.</p>}
            {selectedListing.status === "unpublished" && <p>Approved and ready to publish. This listing is not visible to guests yet.</p>}
            <ListingFacts
              guests={selectedListing.guestCapacity}
              bedrooms={selectedListing.bedrooms}
              bathrooms={selectedListing.bathrooms}
              size={selectedListing.area}
            />
            <div className="my-3">
              <ListingPrice price={selectedListing.pricePerNight} oldPrice={selectedListing.oldPrice} />
            </div>
            <ListingDescription description={selectedListing.description} />
          </section>

          {selectedListing.amenities?.length > 0 && (
            <section className="listing-detail-section"><ListingAmenities amenities={selectedListing.amenities} /></section>
          )}
          {selectedListing.tags?.length > 0 && (
            <section className="listing-detail-section"><ListingTags tags={selectedListing.tags} /></section>
          )}
          {(selectedListing.host?.name || selectedListing.seller?.name) && (
            <section className="listing-detail-section">
              <ListingHostInfo hostName={selectedListing.host?.name || selectedListing.seller?.name} />
            </section>
          )}
          {selectedListing.houseRules?.length > 0 && (
            <section className="listing-detail-section"><ListingHouseRules rules={selectedListing.houseRules} /></section>
          )}

        {role === "seller" && ["published", "unpublished", "draft", "rejected"].includes(selectedListing.status) && (
          <section className="listing-detail-section">
            <div className="d-flex gap-2 flex-wrap">
              {selectedListing.status === "published" && (
                <>
                  <AppButton intent="secondary" appearance="outline" as={Link} to={`/seller/listings/${selectedListing._id}/edit`}>
                    Edit listing
                  </AppButton>

                  <AppButton intent="warning" appearance="outline" disabled={pending || saving} type="button" onClick={() => act("unpublish", selectedListing._id, onUnpublish)}>
                    Unpublish
                  </AppButton>
                </>
              )}

              {selectedListing.status === "unpublished" && (
                <>
                  <AppButton intent="success" appearance="outline" disabled={pending || saving} type="button" onClick={() => act("publish", selectedListing._id, onPublish)}>
                    Publish
                  </AppButton>

                  <AppButton intent="danger" appearance="outline" disabled={pending || saving} type="button" onClick={() => act("delete", selectedListing._id, onDelete)}>
                    Delete permanently
                  </AppButton>
                </>
              )}

              {selectedListing.status === "draft" && (
                <>
                  <AppButton intent="secondary" appearance="outline" as={Link} to={`/seller/listings/${selectedListing._id}/edit`}>
                    Continue editing
                  </AppButton>

                  <AppButton intent="danger" appearance="outline" disabled={pending || saving} type="button" onClick={() => act("delete", selectedListing._id, onDelete)}>
                    Delete permanently
                  </AppButton>
                </>
              )}

              {selectedListing.status === "rejected" && (
                <>
                  <AppButton intent="secondary" appearance="outline" as={Link} to={`/seller/listings/${selectedListing._id}/edit`}>
                    Edit listing
                  </AppButton>

                  <AppButton intent="danger" appearance="outline" disabled={pending || saving} type="button" onClick={() => act("delete", selectedListing._id, onDelete)}>
                    Delete permanently
                  </AppButton>
                </>
              )}
            </div>
          </section>
        )}
          {selectedListing.adminReview?.notes && (
            <section className="listing-detail-section listing-admin-feedback">
              <h6>Admin feedback</h6>
              <p>{selectedListing.adminReview.notes}</p>
            </section>
          )}
        </div>
      </div>
    </Wrapper>
  );
}
