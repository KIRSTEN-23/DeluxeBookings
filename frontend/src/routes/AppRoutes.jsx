import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "../components/common/navbar";
import BuyerRoutes from "../routes/BuyerRoutes";
import SellerRoutes from "../routes/SellerRoutes";
import AdminRoutes from "../routes/AdminRoutes";
import AuthRoutes from "../routes/AuthRoutes";
import UserRoutes from "../routes/UserRoutes";
import NotFound from "../pages/errors/NotFound";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/*" element={<BuyerRoutes />} />

        {/* Keep manual old URLs working */}

        <Route path="/login/*" element={<AuthRoutes />} />
        <Route path="/account/*" element={<UserRoutes />} />

        {/* New grouped URLs */}
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/user/*" element={<UserRoutes />} />
        <Route path="/seller/*" element={<SellerRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
