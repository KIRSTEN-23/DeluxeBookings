import { Route, Routes } from "react-router-dom";

import BuyerListingDetails from "../pages/listings/BuyerListingDetails.jsx";
import SellerOnboarding from "../pages/public/sellerOnboarding.jsx";
import Home from "../pages/public/home.jsx";
import Checkout from "../pages/bookings/checkout.jsx";
import BrowseListings from "../pages/public/BrowseListings.jsx";
// import BuyerAccountPage from "../pages/userAccounts/BuyerAccountPage";

export default function BuyerRoutes() {
  return (
    
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Browse aliases */}

      <Route path="browse" element={<BrowseListings />} />
      <Route path="product" element={<BrowseListings />} />

      {/* Listing detail aliases */}

      <Route path="browse/:id" element={<BuyerListingDetails />} />
      <Route path="product/:id" element={<BuyerListingDetails />} />

      {/* Seller onboarding aliases */}

      <Route path="seller" element={<SellerOnboarding />} />
      <Route path="seller-onboarding" element={<SellerOnboarding />} />
      <Route path="onboarding" element={<SellerOnboarding />} />

      <Route path="checkout" element={<Checkout />} />

      {/* <Route element={<ProtectedRoutes minLevel={1} />}> 
        <Route path="account" element={<BuyerAccountPage />} />
      </Route>  */}
    </Routes>
  );
}
