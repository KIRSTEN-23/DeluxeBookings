import React from "react";
// import Carousel from "./utils/Carousel";
import ReviewForm from "./utils/ReviewForm";
import PropertyGrid from "./utils/PropertyGrid";
import Hero from "./utils/HeroSection";

import SellerDashboard from "./utils/SellerDashboard";
import BookingsCard from "./utils/BookingsCard";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



function App() {
  return (
    <div>
      <BookingsCard />
      <SellerDashboard />
      {/* <div>
        <Hero />
      </div>


      <div>
        <PropertyGrid />
      </div>

      <div>
        <ReviewForm />
      </div> */}
      


    </div>
    
  )
}

export default App