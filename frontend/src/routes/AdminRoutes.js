import { Route } from "react-router-dom";

import ProtectedRoutes from "./ProtectedRoutes";

import AdminListings from "../pages/admin/AdminListings";
import AdminListingDetails from "../pages/admin/AdminListingDetails";

export default function AdminRoutes() {
  return (
    <>
      {/* <Route element={<ProtectedRoutes minLevel={3} />}> */}
        <Route path="/admin/listings" element={<AdminListings />} />
        <Route path="/admin/listings/:id" element={<AdminListingDetails />} />
      {/* </Route> */}
    </>
  );
}