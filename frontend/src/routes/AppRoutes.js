import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AuthRoutes from "./AuthRoutes";
import BuyerRoutes from "./BuyerRoutes";
import SellerRoutes from "./SellerRoutes";
import AdminRoutes from "./AdminRoutes";

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