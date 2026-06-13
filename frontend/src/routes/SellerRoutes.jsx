import { Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import SellerManageMyListings from "../pages/seller/SellerManageMyListingsSection";
import SellerAdminListingDetails from "../pages/listings/SellerAdminListingDetails";
import SellerIntakeForm from "../pages/seller/SellerIntakeForm";
import EditListing from "../pages/seller/EditListing";

export default function SellerRoutes() {
  return (
    <>
      {/* <Route element={<ProtectedRoute minLevel={2} />}> */}
        <Route path="/seller/listings" element={<SellerManageMyListings />} />
        <Route path="/seller/listings/new" element={<ListingForm mode="create" />} />
        <Route path="/seller/listings/:id" element={<SellerAdminListingDetails role="seller" />} />
        <Route path="/seller/listings/:id/edit" element={<ListingForm mode="edit" />} />
      {/* </Route> */}
    </>
  );
}