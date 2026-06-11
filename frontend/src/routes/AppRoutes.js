import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PublicRoutes from "./PublicRoutes";
import AuthRoutes from "./AuthRoutes";
import BuyerRoutes from "./BuyerRoutes";
import SellerRoutes from "./SellerRoutes";
import AdminRoutes from "./AdminRoutes";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {PublicRoutes()}
        {AuthRoutes()}
        {BuyerRoutes()}
        {SellerRoutes()}
        {AdminRoutes()}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}