import { useEffect, useState } from "react";

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

  const handleApprove = async (id) => {
    await approveListing(id, "Approved by admin.");
    await loadQueue();
  };

  const handleReject = async (id) => {
    await rejectListing(id, "Rejected by admin.");
    await loadQueue();
  };

  return (
    <section className="admin-queue-section">
      <div className="admin-queue-header">
        <h1>Listing Review Queue</h1>
        <p>Review submitted listings before they become available to publish.</p>
      </div>

      {isLoading && <p>Loading review queue...</p>}

      {errorMessage && <p>{errorMessage}</p>}

      {!isLoading && listings.length === 0 && (
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