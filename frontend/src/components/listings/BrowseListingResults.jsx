import BuyerListingCard from "./BuyerListingCard";

export default function BrowseListingResults({ listings = [] }) {
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

        <select className="form-select w-auto">
          <option>Sort by highest rating</option>
          <option>Sort by price: low to high</option>
          <option>Sort by newest</option>
        </select>
      </div>

      <div className="d-grid gap-3">
        {listings.map((listing) => (
          <BuyerListingCard key={listing._id} listing={listing} />
        ))}
      </div>
    </section>
  );
}