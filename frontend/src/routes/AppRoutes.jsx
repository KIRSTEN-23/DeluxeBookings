import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AuthRoutes from "./AuthRoutes.jsx";
import BuyerRoutes from "./BuyerRoutes.jsx";
import SellerRoutes from "./SellerRoutes.jsx";
import AdminRoutes from "./AdminRoutes.jsx";

import NotFound from "../pages/errors/NotFound";

export default function AppRoutes() {
  return (
    <BrowserRouter>
       {/* <Routes element={<ProtectedRoutes minLevel={3} />} >  */}
        {AuthRoutes()}
        {BuyerRoutes()}
        {SellerRoutes()}
        {AdminRoutes()}
        <Route path="*" element={<NotFound />} />
      {/* </Routes> */}
    </BrowserRouter>
  );
}