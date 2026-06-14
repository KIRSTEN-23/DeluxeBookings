import React from "react";
import Carousel from "./utils/Carousel";
import ReviewForm from "./utils/ReviewForm";
import PropertyGrid from "./utils/PropertyGrid";
import Hero from "./utils/HeroSection";

import SellerDashboard from "./utils/SellerDashboard";
import BookingsCard from "./utils/BookingsCard";
import CustomerBooking from "./utils/CustomerBooking";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutSection from "./utils/AboutSection";
import LuxurySection from "./utils/LuxurySection";



function App() {
  return (
    <div>
      <div>
        <Carousel />
      </div>
      
       <div>
        <Hero />
      </div>

      <div>
        <AboutSection />
      </div>

      <div>
        <LuxurySection />
      </div>

      <div>
        <PropertyGrid />
      </div>

      

      {/*<div>
        <ReviewForm />
      </div>

      <CustomerBooking /> */}
      {/* <BookingsCard />*/}
      {/* <SellerDashboard />   */}


    </div>
    
  )
}

export default App