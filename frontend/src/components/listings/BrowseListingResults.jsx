import { useState } from "react";
import BuyerListingCard from "./BuyerListingCard";

export default function BrowseListingResults({ listings = [] }) {
  const [sort, setSort] = useState("newest");
  const sorted = [...listings].sort((a, b) => sort === "price" ? a.pricePerNight - b.pricePerNight : new Date(b.createdAt) - new Date(a.createdAt));
  if (!listings.length) {
    return (
      <section className="browse-listing-results">
        <div className="alert alert-light border">
          No listings match your filters yet.
        </div>
      </section>
    );
  }

  return (
    <section className="browse-listing-results">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="mb-0">
          Showing <strong>{listings.length}</strong> stays
        </p>

        <select aria-label="Sort listings" className="form-select w-auto" value={sort} onChange={(event) => setSort(event.target.value)}>
          <option value="price">Sort by price: low to high</option>

          <option value="newest">Sort by newest</option>
        </select>
      </div>

      <div className="row g-4">
        {sorted.map((listing) => (
          <div className="col-12" key={listing._id}>
            <BuyerListingCard listing={listing} />
          </div>
        ))}
      </div>
    </section>
  );
}
