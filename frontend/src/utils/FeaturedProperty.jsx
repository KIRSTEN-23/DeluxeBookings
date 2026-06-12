import PropertyCard from "./PropertyCard";
import properties from "./propertyData";
import "./FeaturedProperty.css";

function FeaturedProperties() {
  return (
    <section className="featured">
      <div className="featured-header">
        <h2>
          Explore Our Luxury
          <br />
          Properties
        </h2>

        <button>View More</button>
      </div>

      <div className="property-grid">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
          />
        ))}
      </div>
    </section>
  );
}

export default FeaturedProperties;