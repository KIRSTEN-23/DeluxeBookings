import NotFound from "../pages/errors/NotFound";
import { Navigate, Routes, Route, useLocation } from "react-router-dom";

import SellerAdminListingDetails from "../pages/listings/SellerAdminListingDetails.jsx";
import SellerCreateListing from "../pages/listings/SellerCreateListing.jsx";
import SellerEditListing from "../pages/listings/SellerEditListing.jsx";

export default function SellerRoutes() {
  const location = useLocation();
  return (
    <Routes>
      <Route index element={<Navigate to="account" replace />} />
      <Route path="account" element={<Navigate to="/account/activity" replace state={location.state} />} />
      <Route
        path="listings/:id"
        element={<SellerAdminListingDetails role="seller" />}
      />
      <Route path="new" element={<SellerCreateListing />} />

      <Route path="listings/:id/edit" element={<SellerEditListing />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
