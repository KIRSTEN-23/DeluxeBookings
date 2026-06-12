function PropertyCard({ property }) {
  return (
    <div className="property-card">
      <img
        src={property.image}
        alt={property.name}
      />

      <div className="property-info">
        <h3>{property.name}</h3>

        <button>→</button>
      </div>
    </div>
  );
}

export default PropertyCard;