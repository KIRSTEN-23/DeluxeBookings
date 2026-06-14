import SearchBar from "../Components/searchBar";
import FilterPanel from "../Components/filterPanel";
import Footer from "../Components/footer";

function Product() {
  
  // Data from search bar or filter panel
  const handleListingsUpdate = (listings) => {
    console.log("Listings filtered:", listings);
    
    if (listings.length === 0) {
      console.log("No matching listings");
    } else {
      console.log(`Found ${listings.length} matching listing(s).`);
    }
  };

  return (
    <section>
      <SearchBar onSearch={handleListingsUpdate} />
      <FilterPanel onFilter={handleListingsUpdate} /> 
      <Footer />
    </section>
  );
}

export default Product;