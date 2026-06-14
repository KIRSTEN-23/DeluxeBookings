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

      <div className="row g-4">
        {listings.map((listing) => (
          <div className="col-12" key={listing._id}>
            <BuyerListingCard listing={listing} />
          </div>
        ))}
      </div>
    </section>
  );
}
