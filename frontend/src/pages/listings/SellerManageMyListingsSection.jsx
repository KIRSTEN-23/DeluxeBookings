import ContentState from "../../components/common/ContentState.jsx";
import { HousePlus, SearchX, TriangleAlert } from "lucide-react";
import AppButton from "../../components/common/AppButton.jsx";
import { errorMessage as getErrorMessage } from "../../utils/feedback";
import { getListingDraft } from "../../utils/listingStorage";
import { useEffect, useMemo, useRef, useState } from "react";
import { Alert, Dropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

import SellerListingCard from "../../components/listings/SellerListingCard.jsx";
import SellerAdminListingDetails from "../../pages/listings/SellerAdminListingDetails.jsx";

import {
  getSellerListings,
  publishSellerListing,
  unpublishSellerListing,
  deleteSellerListing,
} from "../../api/sellerApi.jsx";

import "../../styles/MyListings.css";

const FILTERS = [
  "all",
  "published",
  "in_review",
  "unpublished",
  "draft",
  "rejected",
];

export default function SellerManageMyListingsSection() {
  const location = useLocation();
  const draft = getListingDraft();
  const [listings, setListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [pending, setPending] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [actionMessage, setActionMessage] = useState("");
  const [actionError, setActionError] = useState("");
  const actionPending = useRef(false);
  const changeListing = async (id, action) => {
    if (actionPending.current) return;
    if (action === "delete" && !window.confirm("Permanently delete this listing? This cannot be undone.")) return;
    actionPending.current = true;
    setPending(true);
    setActionMessage("");
    setActionError("");
    try {
      if (action === "delete") {
        await deleteSellerListing(id);
        setListings((items) => items.filter((item) => item._id !== id));
        setSelectedListing(null);
      } else {
        const updated = await (action === "publish" ? publishSellerListing : unpublishSellerListing)(id);
        setListings((items) => items.map((item) => item._id === id ? updated : item));
        setSelectedListing((current) => current?._id === id ? updated : current);
      }
      setActionMessage({ publish: "Listing published. Guests can now find it.", unpublish: "Listing unpublished. It is no longer visible to guests.", delete: "Listing permanently deleted." }[action]);
    } catch (error) {
      setActionError(getErrorMessage(error, "Could not change this listing. Please try again."));
    } finally { actionPending.current = false; setPending(false); }
  };
  const handlePublishListing = (id) => changeListing(id, "publish");
  const handleUnpublishListing = (id) => changeListing(id, "unpublish");
  const handleDeleteListing = (id) => changeListing(id, "delete");

  useEffect(() => {
    const loadListings = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const data = await getSellerListings();

        setListings(data);
      } catch (error) {
        console.error(error);

        setErrorMessage("Could not load your listings.");
      } finally {
        setIsLoading(false);
      }
    };

    loadListings();
  }, [attempt]);

  const filteredListings = useMemo(() => {
    if (activeFilter === "all") {
      return listings;
    }

    return listings.filter((listing) => listing.status === activeFilter);
  }, [activeFilter, listings]);

  const hasDetailPane = Boolean(selectedListing);

  return (
    <section className="my-listings-section" id="my-listings" aria-labelledby="my-listings-heading">
      <h5 id="my-listings-heading">My listings</h5>
      <div className="seller-listings-container">
      {pending && <Alert role="status">Saving listing change…</Alert>}
      {actionMessage && <Alert variant="success" role="status">{actionMessage}</Alert>}
      {actionError && <Alert variant="danger" role="alert">{actionError}</Alert>}
      {draft && listings.length > 0 && <Alert variant="info">You have an unfinished draft saved on this device. <Link to="/seller/new">Resume draft</Link></Alert>}
      {location.state?.message && <Alert variant="success" role="status">{location.state.message}</Alert>}
      <div
        className={`my-listings-layout ${
          hasDetailPane ? "has-detail-pane" : ""
        }`}
      >
        <div className="my-listings-primary">
          {listings.length > 0 && <div className="row my-listings-toolbar g-3 mb-3">
            <div className="col-12 col-lg-8 my-listings-filter-column">
              <div className="my-listings-filters">
                {FILTERS.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    className={`my-listings-filter ${
                      activeFilter === filter ? "active" : ""
                    }`}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter.replace("_", " ")}
                  </button>
                ))}
              </div>

              <Dropdown className="my-listings-filter-dropdown">
                <Dropdown.Toggle className="my-listings-filter-dropdown-toggle">
                  {activeFilter.replace("_", " ")}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {FILTERS.map((filter) => (
                    <Dropdown.Item
                      key={filter}
                      active={activeFilter === filter}
                      onClick={() => setActiveFilter(filter)}
                    >
                      {filter.replace("_", " ")}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <div className="col-12 col-lg-4 my-listings-action-column">
              <AppButton intent="primary" appearance="fill" as={Link} to="/seller/new" className="my-listings-add-button">
                Create Listing
              </AppButton>
            </div>
          </div>}

          {isLoading && <ContentState busy heading="Loading your properties" description="We’re checking your saved listings and their latest statuses." actionLabel="Loading listings…" />}
          {!isLoading && errorMessage && <ContentState error icon={TriangleAlert} heading="Your listings couldn’t load" description={errorMessage} actionLabel="Try again" onAction={() => setAttempt((value) => value + 1)} />}
          {!isLoading && !errorMessage && filteredListings.length === 0 && (
            activeFilter !== "all" && !(activeFilter === "draft" && draft) ? (
              <ContentState icon={SearchX} heading="Nothing in this status" description="Try another status to see your properties, or return to all listings." actionLabel="Show all listings" onAction={() => setActiveFilter("all")} />
            ) : (
              <ContentState icon={HousePlus} heading={draft ? "Your property is taking shape" : "Make room for your first guests"} description={draft ? "You have a draft saved on this device. Finish its details and submit it for review." : "Create your first property listing. Once it is reviewed and published, guests can discover it here."} actionLabel={draft ? "Resume your draft" : "Create a listing"} to="/seller/new" />
            )
          )}

          {!isLoading && !errorMessage && filteredListings.length > 0 && (
            <div className="my-listings-list">
              <h6>Your property portfolio</h6>
              <div className="my-listings-card-panel">
                <div className="my-listings-card-scroll">
                  {filteredListings.map((listing) => (
                    <SellerListingCard
                      key={listing._id}
                      listing={listing}
                      pending={pending}
                      selected={selectedListing?._id === listing._id}
                      onViewDetails={() => setSelectedListing(listing)}
                      onPublish={handlePublishListing}
                      onUnpublish={handleUnpublishListing}
                      onDelete={handleDeleteListing}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {hasDetailPane && (
          <>
            <div
              className="my-listings-offcanvas-scrim"
              onClick={() => setSelectedListing(null)}
              aria-hidden="true"
            />

            <SellerAdminListingDetails
              listing={selectedListing}
              role="seller"
              isPane
              pending={pending}
              onClose={() => setSelectedListing(null)}
              onUnpublish={handleUnpublishListing}
              onPublish={handlePublishListing}
              onDelete={handleDeleteListing}
            />
          </>
        )}
      </div>
      </div>
    </section>
  );
}
