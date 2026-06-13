import React from "react";
// import Carousel from "./utils/Carousel";
import ReviewForm from "./utils/ReviewForm";
import PropertyGrid from "./utils/PropertyGrid";
import Hero from "./utils/HeroSection";



function App() {
  return (
    <div>
      
      <div>
        <Hero />
      </div>


      <div>
        <PropertyGrid />
      </div>

      <div>
        <ReviewForm />
      </div>
      
    </div>
    
  )
}

export default App