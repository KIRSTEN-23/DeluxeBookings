import './index.css';
import './joe.css'
import LogIn from "./Pages/login";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Pages/home";
import Account from "./Pages/account";
import Product from "./Pages/product";
import Seller from "./Pages/seller";
import NavBar from './Components/navbar';
import Checkout from './Pages/checkout';
import SellerLoggedIn from './Pages/sellerLoggedIn';
import AdminDashboard from './Pages/adminDashboard';
import ProtectedRoute from './Pages/AdminRoute';
import React from "react";
import Carousel from "./utils/Carousel";
import ReviewForm from "./utils/ReviewForm";
import PropertyGrid from "./utils/PropertyGrid";
import Hero from "./utils/HeroSection";

import SellerDashboard from "./utils/SellerDashboard";

import CustomerBooking from "./utils/CustomerBooking";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutSection from "./utils/AboutSection";
import LuxurySection from "./utils/LuxurySection";
import OffersSection from "./utils/OfferSection";


function App() {
  
  return (

    
    <BrowserRouter>
      <NavBar></NavBar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/seller" element={<Seller />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/account" element={<Account />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route 
          path="/sellerLoggedIn" 
          element={
            //<ProtectedRoute allowedRoles={['S', 'A']}>
              <SellerLoggedIn />
            //</ProtectedRoute>
          } 
        />

      <Route 
        path="/adminDashboard" 
        element={
          //<ProtectedRoute allowedRoles={['A']}>
            <AdminDashboard />
          //</ProtectedRoute>
        } 
      />
            </Routes>


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

      <div>
        <OffersSection />
      </div>

      

      <div>
        <ReviewForm />
      </div>

      {/*<CustomerBooking /> */}
      
      {/* <SellerDashboard />   */}


    </div>

    </BrowserRouter>
  );
}

export default App;





