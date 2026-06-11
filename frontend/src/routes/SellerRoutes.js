import { Route } from "react-router-dom";

import ProtectedRoutes from "./ProtectedRoutes";

import MyListings from "../pages/seller/MyListings";
import SellerListingDetails from "../pages/seller/SellerListingDetails";
import SellerIntakeForm from "../pages/seller/SellerIntakeForm";
import EditListing from "../pages/seller/EditListing";

export default function SellerRoutes() {
  return (
    <>
      {/* <Route element={<ProtectedRoutes minLevel={2} />}> */}
        <Route path="/seller/my-listings" element={<MyListings />} />
        <Route path="/seller/my-listings/:id" element={<SellerListingDetails />} />
        <Route path="/seller/create" element={<SellerIntakeForm />} />
        <Route path="/seller/edit/:id" element={<EditListing />} />
      {/* </Route> */}
    </>
  );
}