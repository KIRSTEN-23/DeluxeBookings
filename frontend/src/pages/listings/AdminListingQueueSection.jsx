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
        <h1>Listing Review Queue</h1>
        <p>Review submitted listings before they become available to publish.</p>
      </div>

      {rejectId && <form className="alert alert-warning" onSubmit={(event) => { event.preventDefault(); if (rejectionNotes.trim()) decide(rejectId, false, rejectionNotes.trim()); }}>
        <label htmlFor="rejection-notes">Explain what the seller needs to fix</label>
        <textarea id="rejection-notes" required maxLength={1000} value={rejectionNotes} onChange={(event) => setRejectionNotes(event.target.value)} />
        <button type="submit" disabled={Boolean(pendingId) || !rejectionNotes.trim()}>Confirm rejection</button>
        <button type="button" disabled={Boolean(pendingId)} onClick={() => setRejectId(null)}>Cancel</button>
      </form>}
      {isLoading && <p>Loading review queue...</p>}

      {errorMessage && <p role="alert">{errorMessage} <button disabled={Boolean(pendingId)} onClick={loadQueue}>Reload queue</button></p>}
      {successMessage && <p role="status">{successMessage}</p>}

      {!isLoading && !errorMessage && listings.length === 0 && (
        <p>No listings are currently waiting for review.</p>
      )}

      {!isLoading && listings.length > 0 && (
        <div className="admin-queue-layout">
          <div className="admin-queue-list">
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

          <SellerAdminListingDetails
            listing={selectedListing}
            role="admin"
            isPane
            onClose={() => setSelectedListing(null)}
          />
        </div>
      )}
    </section>
  );
}