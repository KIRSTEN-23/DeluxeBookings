import { Routes, Route } from "react-router-dom";

import AccountPage from "../pages/userAccounts/AccountPage.jsx";
import SellerAdminListingDetails from "../pages/listings/SellerAdminListingDetails.jsx";
import SellerCreateListing from "../pages/listings/SellerCreateListing.jsx";
import SellerEditListing from "../pages/listings/SellerEditListing.jsx";

export default function SellerRoutes() {
  return (
    <Routes>
      <Route path="account" element={<AccountPage />} />
      <Route
        path="listings/:id"
        element={<SellerAdminListingDetails role="seller" />}
      />
      <Route path="listings/new" element={<SellerCreateListing />} />

      <Route path="listings/:id/edit" element={<SellerEditListing />} />
    </Routes>
  );
}
