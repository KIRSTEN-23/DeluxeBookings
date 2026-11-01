import ContentState from "../../components/common/ContentState.jsx";
import { ClipboardCheck, TriangleAlert } from "lucide-react";
import AppButton from "../../components/common/AppButton.jsx";
import { useEffect, useRef, useState } from "react";

import { errorMessage as getErrorMessage } from "../../utils/feedback";
import AdminListingCard from "../../components/listings/AdminListingCard";
import SellerAdminListingDetails from "./SellerAdminListingDetails";

import {
  getListingsInReview,
  approveListing,
  rejectListing,
} from "../../api/adminApi";

export default function AdminListingQueueSection() {
  const [listings, setListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [pendingId, setPendingId] = useState(null);
  const [rejectId, setRejectId] = useState(null);
  const [rejectionNotes, setRejectionNotes] = useState("");
  const actionPending = useRef(false);

  useEffect(() => {
    loadQueue();
  }, []);

  const loadQueue = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const data = await getListingsInReview();
      setListings(data);
      setSelectedListing(data[0] || null);
    } catch (error) {
      setErrorMessage("Could not load admin review queue.");
    } finally {
      setIsLoading(false);
    }
  };

  const decide = async (id, approve, notes) => {
    if (actionPending.current) return;
    actionPending.current = true;
    setPendingId(id);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      await (approve ? approveListing : rejectListing)(id, notes);
      setRejectId(null);
      setRejectionNotes("");
      await loadQueue();
      setSuccessMessage(approve ? "Listing approved. The seller can now publish it." : "Listing rejected. Feedback is available to the seller.");
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "Could not save your decision. Please try again."));
    } finally {
      actionPending.current = false;
      setPendingId(null);
    }
  };
  const handleApprove = (id) => decide(id, true, "Approved by admin.");
  const handleReject = (id) => { setRejectId(id); setRejectionNotes(""); };

  return (
    <section className="admin-queue-section">
      <div className="admin-queue-header">
        <h5>Listing Review Queue</h5>
        <p>Review submitted listings before they become available to publish.</p>
      </div>

      {rejectId && <form className="alert alert-warning" onSubmit={(event) => { event.preventDefault(); if (rejectionNotes.trim()) decide(rejectId, false, rejectionNotes.trim()); }}>
        <label htmlFor="rejection-notes">Explain what the seller needs to fix</label>
        <textarea id="rejection-notes" required maxLength={1000} value={rejectionNotes} onChange={(event) => setRejectionNotes(event.target.value)} />
        <AppButton intent="danger" appearance="fill" type="submit" disabled={Boolean(pendingId) || !rejectionNotes.trim()}>Confirm rejection</AppButton>
        <AppButton intent="secondary" appearance="outline" type="button" disabled={Boolean(pendingId)} onClick={() => setRejectId(null)}>Cancel</AppButton>
      </form>}
      {isLoading && <ContentState busy framed heading="Checking submissions" description="We’re loading the properties awaiting your decision." actionLabel="Loading queue…" />}

      {!isLoading && errorMessage && <ContentState error framed icon={TriangleAlert} heading="The queue couldn’t load" description={errorMessage} actionLabel="Try again" onAction={loadQueue} />}
      {successMessage && <p role="status">{successMessage}</p>}

      {!isLoading && !errorMessage && listings.length === 0 && (
        <ContentState framed icon={ClipboardCheck} heading="You’re all caught up" description="There are no property submissions awaiting review. New submissions will appear here." actionLabel="Check for submissions" onAction={loadQueue} />
      )}

      {!isLoading && !errorMessage && listings.length > 0 && (
        <div className="admin-queue-layout">
          <div className="admin-queue-list" aria-label="Listings awaiting review">
            {listings.map((listing) => (
              <AdminListingCard
                key={listing._id}
                listing={listing}
                isActive={selectedListing?._id === listing._id}
                onView={setSelectedListing}
                pending={Boolean(pendingId)}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))}
          </div>

          {selectedListing && <SellerAdminListingDetails
            listing={selectedListing}
            role="admin"
            isPane
            onClose={() => setSelectedListing(null)}
          />}
        </div>
      )}
    </section>
  );
}
