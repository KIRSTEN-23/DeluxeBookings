import "./Hero.css";
import wideImg1 from "../assets/wide_Img1.jpg";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-image">
        <img
          src={wideImg1}
          alt="Luxury Property"
        />
      </div>

      <div className="hero-content">
        <p>Luxury • Exclusive</p>

        <h1>
          Discover Your
          <br />
          Dream Property
        </h1>

        <p>
          Browse luxury villas, penthouses and premium
          homes available for booking.
        </p>

        <button>Explore Properties</button>
      </div>
    </section>
  );
}

export default Hero;