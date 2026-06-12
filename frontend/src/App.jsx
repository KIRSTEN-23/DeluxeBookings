import React from "react";
// import Carousel from "./utils/Carousel";
import ReviewForm from "./utils/ReviewForm";
import FeaturedProperty from "./utils/FeaturedProperty";
import Hero from "./utils/HeroSection";



function App() {
  return (
    <div>
      
      <div>
        <Hero />
      </div>


      <div>
        <FeaturedProperty />
      </div>

      <div>
        <ReviewForm />
      </div>
      
    </div>
    
  )
}

export default App