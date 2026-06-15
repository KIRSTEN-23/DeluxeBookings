import { Nav } from "react-bootstrap";
import HeroHeader from "../../components/public/heroheader";
import Footer from "../../components/common/footer";
import NavBar from "../../components/common/navbar";

import Carousel from "../../components/public/Carousel";
import ReviewForm from "../../components/public/ReviewForm";
import PropertyGrid from "../../components/public/PropertyGrid";
import Hero from "../../components/public/HeroSection";

import AboutSection from "../../components/public/AboutSection";
import LuxurySection from "../../components/public/LuxurySection";
import OfferSection from "../../components/public/OfferSection";

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
        <OfferSection />
      </div>

  <Footer></Footer>
  </div>
  )
}

export default Home;