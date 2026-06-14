import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import {
  Navigation,
  Pagination,
  EffectCoverflow,
} from "swiper/modules";

import "./Carousel.css";

import image1 from "../assets/image_3.jpg";
import image2 from "../assets/image_4.jpg";
import image3 from "../assets/image_5.jpg";
import image4 from "../assets/image_6.jpg";
import image5 from "../assets/image_7.jpg";
import image6 from "../assets/image_8.jpg";
import image7 from "../assets/image_9.jpg";
import image8 from "../assets/image_10.jpg";
import image9 from "../assets/image_1.jpg";
import image10 from "../assets/image_2.jpg";


function Carousel() {
  return (
    

    <section className="featured-properties">



      <div className="section-header">
    <span>Exclusive Collection</span>
    <h2>Featured Luxury Properties</h2>
    <p>
      Discover handpicked luxury villas, penthouses, and estates
      across South Africa.
    </p>
  </div>

      
    <div className="carousel-container">
      

      <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      loop={true}
      slidesPerView={"auto"}
      coverflowEffect={
        {
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }
      }
      pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}

      modules={[Navigation, Pagination, EffectCoverflow]}
      className="swiper-container"
      >
        <SwiperSlide>
          <img src={image1} alt="Property 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image2} alt="Property 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image3} alt="Property 3" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image4} alt="Property 4" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image5} alt="Property 5" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image6} alt="Property 6" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image7} alt="Property 7" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image8} alt="Property 8" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image9} alt="Property 9" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image10} alt="Property 10" />
        </SwiperSlide>

        <div className="swiper-controller">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon ></ion-icon>
          </div>

          <div className="swiper-pagination"></div>

           <div className="swiper-button-next slider-arrow">
            <ion-icon ></ion-icon>
          </div>

          

          
        </div>


      </Swiper>
    </div>
    </section>
  )
}

export default Carousel;













// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import Carousel from 'react-bootstrap/Carousel';
// import "./Carousel.css";
// import img1 from "/public/img1.jpg";
// import img3 from "/public/img3.jpg";

// function Carousel() {
//   return (
//         <section className="carousel">   
//           <Card className="card" style={{ width: '18rem' }}>
//             <Card.Img variant="top" src={img1} />
//             <Card.Body>
//               <Card.Title>Card Title</Card.Title>
//               <Card.Text>
//           Some quick example text to build on the card title and make up the
//           bulk of the card's content.
//         </Card.Text>
//         <Button variant="primary">Go somewhere</Button>
//       </Card.Body>
//     </Card>
       

    
//           <Card className="card" style={{ width: '18rem' }}>
//             <Card.Img variant="top" src={img3} />
//             <Card.Body>
//               <Card.Title>Card Title</Card.Title>
//               <Card.Text>
//           Some quick example text to build on the card title and make up the
//           bulk of the card's content.
//         </Card.Text>
//         <Button variant="primary">Go somewhere</Button>
//       </Card.Body>
//     </Card>
//         </section>
    
//   );
// }

// export default Carousel;



// import React, { useState } from "react";
// // import { Swiper, SwiperSlide } from "swiper/react";
// // import { Navigation } from "swiper/modules";
// // import { FaHeart, FaChevronLeft, FaChevronRight } from "react-icons/fa";
// // import "swiper/css";
// // import "swiper/css/navigation";
// import "./Carousel.css";

// const hotels = [
//   {
//     id: 1,
//     title: "Sandton Skye Premium Suites & Penthouses",
//     location: "Johannesburg, South Africa",
//     price: "ZAR 2,574",
//     rating: "8.2",
//     reviews: "611 reviews",
//     image:
//       "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
//   },
//   {
//     id: 2,
//     title: "Luxury Ocean Apartments",
//     location: "Cape Town, South Africa",
//     price: "ZAR 3,200",
//     rating: "8.5",
//     reviews: "420 reviews",
//     image:
//       "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2",
//   },
//   {
//     id: 3,
//     title: "Modern Penthouse Suites",
//     location: "Durban, South Africa",
//     price: "ZAR 1,980",
//     rating: "8.0",
//     reviews: "280 reviews",
//     image:
//       "https://images.unsplash.com/photo-1494526585095-c41746248156",
//   },
//   {
//     id: 4,
//     title: "Coastal Paradise Resort",
//     location: "Cape Town, South Africa",
//     price: "ZAR 4,100",
//     rating: "8.3",
//     reviews: "520 reviews",
//     image:
//       "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
//   },
//   {
//     id: 5,
//     title: "Sandton Skye Premium Suites & Penthouses",
//     location: "Johannesburg, South Africa",
//     price: "ZAR 2,574",
//     rating: "8.2",
//     reviews: "611 reviews",
//     image:
//       "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
//   },
//   {
//     id: 6,
//     title: "Luxury Ocean Apartments",
//     location: "Cape Town, South Africa",
//     price: "ZAR 3,200",
//     rating: "8.5",
//     reviews: "420 reviews",
//     image:
//       "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2",
//   },
//   {
//     id: 7,
//     title: "Modern Penthouse Suites",
//     location: "Durban, South Africa",
//     price: "ZAR 1,980",
//     rating: "8.0",
//     reviews: "280 reviews",
//     image:
//       "https://images.unsplash.com/photo-1494526585095-c41746248156",
//   },
//   {
//     id: 8,
//     title: "Coastal Paradise Resort",
//     location: "Cape Town, South Africa",
//     price: "ZAR 4,100",
//     rating: "8.3",
//     reviews: "520 reviews",
//     image:
//       "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
//   },
// ];

// function Carousel() {
//   const [activeIndex, setActiveIndex] = useState(0);

//   return (
//     <div className="carousel-container-hero luxury-theme">
//       <div className="hero-content">
//   <span>Luxury Properties</span>

//   <h1>
//     Luxury Without
//     <br />
//     Compromise
//   </h1>

//   <p>
//     Discover South Africa's finest luxury stays.
//   </p>
// </div>
//       <Swiper
//         modules={[Navigation]}
//         spaceBetween={0}
//         slidesPerView={3}
//         centeredSlides={true}
//         loop={true}
//         navigation={{
//           nextEl: ".next-btn-hero",
//           prevEl: ".prev-btn-hero",
//         }}
//         onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
//         breakpoints={{
//           320: {
//             slidesPerView: 1.2,
//           },
//           768: {
//             slidesPerView: 2,
//           },
//           1024: {
//             slidesPerView: 3,
//           },
//         }}
//       >
//         {hotels.map((hotel, index) => (
//           <SwiperSlide key={hotel.id}>
//             <div
//               className="hotel-card-hero"
//               style={{
//                 transform: activeIndex === index ? "scale(1)" : "scale(0.88)",
//                 opacity: activeIndex === index ? 1 : 0.55,
//                 transition: "transform 0.4s, opacity 0.4s",
//               }}
//             >
//               <div className="image-wrapper">
//             <img src={hotel.image} alt={hotel.title} />

//             <div className="overlay-hero"></div>

//             <button className="heart-btn-hero">
//               <FaHeart />
//             </button>

//             <div className="title-section">
//               <h2>{hotel.title}</h2>
//             </div>
//           </div>

//           <div className="hotel-info">
//             <h4>{hotel.location}</h4>

//             <div className="bottom-row">
//               <div className="rating-box">
//                 <div className="rating-number">
//                   {hotel.rating}
//                 </div>

//                 <div className="rating-text">
//                   <span>Very good</span>
//                   <p>{hotel.reviews}</p>
//                 </div>
//               </div>

//               <div className="price-box">
//                 <span>Starting from</span>
//                 <h3>{hotel.price}</h3>
//               </div>
//             </div>
//           </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       <div className="nav-buttons-hero">
//         <button className="prev-btn-hero">
//           <FaChevronLeft />
//         </button>

//         <button className="next-btn-hero">
//           <FaChevronRight />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Carousel;