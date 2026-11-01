import ContentState from "../../components/common/ContentState.jsx";
import { TriangleAlert } from "lucide-react";
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
  const [filterVersion, setFilterVersion] = useState(0);
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

  const resetFilters = () => { setQuery({}); setFilterVersion((value) => value + 1); };

  return (
    <main className="browse-page">
      <header className="browse-hero">
        <div className="browse-hero-inner">
          <h1>Find your stay</h1>
          <SearchBar key={filterVersion} onSearch={handleQueryUpdate} isSearching={isLoading} />
        </div>
      </header>
      <div className="browse-layout">
        <aside className="browse-filters" aria-label="Filter stays">
          <div className="browse-filter-content">
            <FilterPanel key={filterVersion} onFilter={handleQueryUpdate} isSearching={isLoading} />
          </div>
        </aside>
        <section className="browse-results" aria-label="Available stays" aria-busy={isLoading}>
          {isLoading && <ContentState busy framed heading="Finding your next stay" description="We’re loading available properties for your search." actionLabel="Loading stays…" />}
          {!isLoading && errorMessage && <ContentState error framed icon={TriangleAlert} heading="Stays couldn’t load" description={errorMessage} actionLabel="Try again" onAction={() => setAttempt((n) => n + 1)} />}
          {!isLoading && !errorMessage && <BrowseListingResults listings={listings} hasFilters={Object.values(query).some(Boolean)} onReset={resetFilters} onRetry={() => setAttempt((n) => n + 1)} />}
        </section>
      </div>
    </main>
  );
}
