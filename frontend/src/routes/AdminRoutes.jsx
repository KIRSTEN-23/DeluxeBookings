import { Routes, Route } from "react-router-dom";

import AdminListingQueueSection from "../pages/listings/AdminListingQueueSection";
import SellerAdminListingDetails from "../pages/listings/SellerAdminListingDetails";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminListingQueueSection />} />
      <Route path="listings" element={<AdminListingQueueSection />} />
      <Route
        path="listings/:id"
        element={<SellerAdminListingDetails role="admin" />}
      />
    </Routes>
  );
}