import React from "react";
import "./PropertyGrid.css";
import { FaArrowUp } from "react-icons/fa";

import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import img6 from "../assets/img6.jpg";


const properties = [
  {
    id: 1,
    tag: "Total Privacy",
    name: "Private Estates",
    description:
      "We curate secluded retreats designed for total privacy and refined comfort.",
    image:img1,
    size: "small",
  },
  {
    id: 2,
    name: "Modern Penthouse Suites",
    image:img2,
    size: "tall",
  },
  {
    id: 3,
    name: "Sandton Skye Premium Suites & Penthouses",
    image:img3,
    size: "tall",
  },
  {
    id: 4,
    name: "Metropolitan Suites",
    image:img4,
    size: "small",
  },
  {
    id: 5,
    name: "Mountain Retreats",
    image:img5,
    size: "small",
  },
  {
    id: 6,
    name: "Coastal Paradise Resort",
    image:img6,
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