import { BrowserRouter, Routes, Route } from "react-router-dom";

// import BrowseListings from "../pages/public/BrowseListings.jsx";
// import BuyerListingDetails from "../pages/listings/BuyerListingDetails.jsx";

// import AuthRoutes from "./AuthRoutes.jsx";
import BuyerRoutes from "./BuyerRoutes.jsx";
// import SellerRoutes from "./SellerRoutes.jsx";
// import AdminRoutes from "./AdminRoutes.jsx";

import NotFound from "../pages/errors/NotFound";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="auth/*" element={<AuthRoutes />} /> */}
        <Route path="/public/*" element={<BuyerRoutes />} />
        {/* <Route path="/seller/*" element={<SellerRoutes />} /> */}
        {/* <Route path="/admin/*" element={<AdminRoutes />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

{
  /* <Route path="/" element={<BrowseListings />} />
        <Route path="/listings/:id" element={<BuyerListingDetails />} /> */
}
