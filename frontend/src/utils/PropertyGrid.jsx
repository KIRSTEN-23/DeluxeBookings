import React from "react";
import "./PropertyGrid.css";
import { FaArrowUp } from "react-icons/fa";

const properties = [
  {
    id: 1,
    name: "Mondrian",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    size: "small",
  },
  {
    id: 2,
    name: "Nirnia",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba",
    size: "large",
  },
  {
    id: 3,
    name: "Artex",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858",
    size: "large",
  },
  {
    id: 4,
    name: "Brera",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    size: "small",
  },
  {
    id: 5,
    name: "Alea Pro",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156",
    size: "medium",
  },
  {
    id: 6,
    name: "Nirnia",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    size: "tall",
  },
];

const PropertyGrid = () => {
  return (
    <section className="property-section">
      <div className="property-grid">
        {properties.map((property) => (
          <div
            key={property.id}
            className={`property-card ${property.size}`}
          >
            <img
              src={property.image}
              alt={property.name}
            />

            <div className="overlay">
              <h3>{property.name}</h3>

              <button className="arrow-btn">
                <FaArrowUp />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PropertyGrid;