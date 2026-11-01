import ContentState from "../common/ContentState.jsx";
import { SearchX, House } from "lucide-react";
import { useState } from "react";
import BuyerListingCard from "./BuyerListingCard";

export default function BrowseListingResults({ listings = [], hasFilters = false, onReset, onRetry }) {
  const [sort, setSort] = useState("newest");
  const sorted = [...listings].sort((a, b) => sort === "price" ? a.pricePerNight - b.pricePerNight : new Date(b.createdAt) - new Date(a.createdAt));
  if (!listings.length) {
    return (
      <section className="browse-listing-results">
        <ContentState framed icon={hasFilters ? SearchX : House} heading={hasFilters ? "No stays match this search" : "New stays are on their way"} description={hasFilters ? "Try fewer filters or clear your search to explore all available properties." : "Published properties will appear here when they become available. Check again for the latest stays."} actionLabel={hasFilters ? "Clear filters" : "Check again"} onAction={hasFilters ? onReset : onRetry} />
      </section>
    );
  }

  return (
    <section className="browse-listing-results">
      <div className="browse-results-toolbar">
        <p className="mb-0">
          Showing <strong>{listings.length}</strong> stays
        </p>

        <select aria-label="Sort listings" className="form-select" value={sort} onChange={(event) => setSort(event.target.value)}>
          <option value="price">Sort by price: low to high</option>

          <option value="newest">Sort by newest</option>
        </select>
      </div>

      <div className="browse-result-list">
        {sorted.map((listing) => (
          <div className="browse-result-item" key={listing._id}>
            <BuyerListingCard listing={listing} />
          </div>
        ))}
      </div>
    </section>
  );
}
