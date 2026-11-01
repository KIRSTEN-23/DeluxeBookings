import { useEffect, useState } from "react";

import SearchBar from "../../components/listings/searchBar";
import FilterPanel from "../../components/listings/filterPanel";
import BrowseListingResults from "../../components/listings/BrowseListingResults.jsx";
// import Footer from "../../components/common/footer";

import api from "../../api/config";
import { errorMessage as getErrorMessage } from "../../utils/feedback";

export default function BrowseListings() {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [query, setQuery] = useState({});
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setErrorMessage("");
    api.get("/listings/search", { params: query }).then(({ data }) => {
      if (active) setListings(data);
    }).catch((error) => {
      if (active) setErrorMessage(getErrorMessage(error, "Could not load listings. Please try again."));
    }).finally(() => { if (active) setIsLoading(false); });
    return () => { active = false; };
  }, [query, attempt]);
  const handleQueryUpdate = (fields) => setQuery((current) => ({ ...current, ...fields }));

  return (
    <main className="browse-page">
      <h1>Find your stay</h1>
      <SearchBar onSearch={handleQueryUpdate} isSearching={isLoading} />
      <div className="browse-layout">
        <aside className="browse-filters" aria-label="Filter stays">
          <button type="button" className="browse-filter-toggle btn btn-outline-dark" aria-expanded={filtersOpen} aria-controls="browse-filter-content" onClick={() => setFiltersOpen((open) => !open)}>
            {filtersOpen ? "Hide filters" : "Show filters"}
          </button>
          <div id="browse-filter-content" className={`browse-filter-content ${filtersOpen ? "is-open" : ""}`}>
            <FilterPanel onFilter={handleQueryUpdate} isSearching={isLoading} />
          </div>
        </aside>
        <section className="browse-results" aria-label="Available stays" aria-busy={isLoading}>
          {isLoading && <div role="status" className="alert alert-light border">Loading available stays...</div>}
          {errorMessage && <div role="alert" className="alert alert-danger">{errorMessage} <button onClick={() => setAttempt((n) => n + 1)}>Retry</button></div>}
          {!isLoading && !errorMessage && <BrowseListingResults listings={listings} />}
        </section>
      </div>
    </main>
  );
}
