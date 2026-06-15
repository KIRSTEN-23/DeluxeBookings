import React from "react";
import Counter from "./Counter";

function LuxurySection() {
  return (
    <section className="stats-section">
      <div className="stats-container">

        <div className="stat-card">
          <Counter target={500} />
          <p>Products</p>
        </div>

        <div className="stat-card">
          <Counter target={20} />
          <p>Projects</p>
        </div>

        <div className="stat-card">
          <Counter target={50} />
          <p>Satisfied Customers</p>
        </div>

        <div className="stat-card">
          <h2>1st</h2>
          <p>Top 1 in Paris</p>
        </div>

      </div>
    </section>
  );
}

export default LuxurySection;