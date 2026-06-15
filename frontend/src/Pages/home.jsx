import { Nav } from "react-bootstrap";
import HeroHeader from "../Components/heroheader";
import Footer from "../Components/footer";
import NavBar from "../Components/navbar";

import Carousel from "../utils/Carousel";
import ReviewForm from "../utils/ReviewForm";
import PropertyGrid from "../utils/PropertyGrid";
import Hero from "../utils/HeroSection";

import AboutSection from "../utils/AboutSection";
import LuxurySection from "../utils/LuxurySection";
import OffersSection from "../utils/OfferSection";

function Home() {
  return (
    <div>
  <HeroHeader></HeroHeader>
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

      <div>
        <OffersSection />
      </div>

  <Footer></Footer>
  </div>
  )
}

export default Home;