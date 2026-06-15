import { useEffect, useState } from "react";

import SearchBar from "../../components/listings/searchBar";
import FilterPanel from "../../components/listings/filterPanel";
import BrowseListingResults from "../../components/listings/BrowseListingResults.jsx";
// import Footer from "../../components/common/footer";

import { getPublicListings } from "../../api/publicApi";

export default function BrowseListings() {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadDefaultListings();
  }, []);

  const loadDefaultListings = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      // API call.
      const data = await getPublicListings();
      setListings(data);
    } catch (error) {
      setErrorMessage("Could not load listings.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleListingsUpdate = (updatedListings) => {
    setListings(updatedListings);

    if (updatedListings.length === 0) {
      console.log("No matching listings");
    } else {
      console.log(`Found ${updatedListings.length} matching listing(s).`);
    }
  };

  return (
    <main className="container-fluid px-4 py-4">
      <div className="row g-4">
        <h1>Browse page is rendering</h1>
        <aside className="col-12 col-lg-3">
          <SearchBar onSearch={handleListingsUpdate} />
          <FilterPanel onFilter={handleListingsUpdate} />
        </aside>

        <section className="col-12 col-lg-9">
          {isLoading && (
            <div className="alert alert-light border">
              Loading available stays...
            </div>
          )}

          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}

          {!isLoading && !errorMessage && (
            <BrowseListingResults listings={listings} />
          )}
        </section>
      </div>
    </main>
  );
}
