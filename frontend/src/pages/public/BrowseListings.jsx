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
    <main className="container-fluid px-4 py-4">
      <div className="row g-4">
        <h1>Find your stay</h1>
        <aside className="col-12 col-lg-3">
          <SearchBar onSearch={handleQueryUpdate} isSearching={isLoading} />
          <FilterPanel onFilter={handleQueryUpdate} isSearching={isLoading} />
        </aside>

        <section className="col-12 col-lg-9">
          {isLoading && (
            <div className="alert alert-light border">
              Loading available stays...
            </div>
          )}

          {errorMessage && (
            <div role="alert" className="alert alert-danger">{errorMessage} <button onClick={() => setAttempt((n) => n + 1)}>Retry</button></div>
          )}

          {!isLoading && !errorMessage && (
            <BrowseListingResults listings={listings} />
          )}
        </section>
      </div>
    </main>
  );
}
