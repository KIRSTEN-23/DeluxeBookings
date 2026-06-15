import { useEffect, useMemo, useState } from "react";
import { Alert, Dropdown, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

import SellerListingCard from "../../components/listings/SellerListingCard.jsx";
import SellerAdminListingDetails from "../../pages/listings/SellerAdminListingDetails.jsx";

import {
  getSellerListings,
  unpublishSellerListing,
  deleteSellerListing,
} from "../../api/sellerApi.jsx";

import "../../styles/pages/seller/MyListings.css";

const FILTERS = [
  "all",
  "published",
  "in_review",
  "unpublished",
  "draft",
  "rejected",
];

export default function SellerManageMyListingsSection() {
  const [listings, setListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleUnpublishListing = async (id) => {
    const updatedListing = await unpublishSellerListing(id);

    setListings((currentListings) =>
      currentListings.map((listing) =>
        listing._id === id ? updatedListing : listing,
      ),
    );

    setSelectedListing(null);
  };

  const handleDeleteListing = async (id) => {
    await deleteSellerListing(id);

    setListings((currentListings) =>
      currentListings.filter((listing) => listing._id !== id),
    );

    setSelectedListing(null);
  };

  useEffect(() => {
    const loadListings = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const data = await getSellerListings();

        console.log("SELLER LISTINGS:", data);

        setListings(data);
      } catch (error) {
        console.error(error);

        setErrorMessage("Could not load your listings.");
      } finally {
        setIsLoading(false);
      }
    };

    loadListings();
  }, []);

  const filteredListings = useMemo(() => {
    if (activeFilter === "all") {
      return listings;
    }

    return listings.filter((listing) => listing.status === activeFilter);
  }, [activeFilter, listings]);

  const hasDetailPane = Boolean(selectedListing);

  return (
    <section className="my-listings-section">
      <div
        className={`my-listings-layout ${
          hasDetailPane ? "has-detail-pane" : ""
        }`}
      >
        <div className="my-listings-primary">
          <div className="row my-listings-toolbar g-3 mb-3">
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
              <Link
                to="/seller/listings/new"
                className="btn btn-primary my-listings-add-button"
              >
                Create Listing
              </Link>
            </div>
          </div>

          {isLoading && (
            <Alert
              variant="light"
              className="border d-flex align-items-center gap-2"
            >
              <Spinner animation="border" size="sm" />
              Loading your listings...
            </Alert>
          )}

          {!isLoading && errorMessage && (
            <Alert variant="danger">{errorMessage}</Alert>
          )}

          {!isLoading && !errorMessage && filteredListings.length === 0 && (
            <Alert variant="light" className="border">
              No listings found.
            </Alert>
          )}

          {!isLoading && !errorMessage && filteredListings.length > 0 && (
            <div className="my-listings-list">
              <div className="my-listings-card-panel">
                <div className="my-listings-card-scroll">
                  {filteredListings.map((listing) => (
                    <SellerListingCard
                      key={listing._id}
                      listing={listing}
                      selected={selectedListing?._id === listing._id}
                      onViewDetails={() => setSelectedListing(listing)}
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
              onClose={() => setSelectedListing(null)}
              onUnpublish={handleUnpublishListing}
              onPublish={handlePublishListing}
              onDelete={handleDeleteListing}
            />
          </>
        )}
      </div>
    </section>
  );
}
