import { Route, Routes } from "react-router-dom";

import BrowsePage from "../pages/public/BrowseListings";
import BuyerListingDetails from "../pages/listings/BuyerListingDetails";
import SellerOnboarding from "../pages/public/SellerOnboarding";
// import BuyerAccountPage from "../pages/userAccounts/BuyerAccountPage";

export default function BuyerRoutes() {
  return (
    <Routes>
      <Route path="browse" element={<BrowsePage />} />
      <Route path="browse/:id" element={<BuyerListingDetails />} />
      <Route path="onboarding" element={<SellerOnboarding />} />

      {/* <Route element={<ProtectedRoutes minLevel={1} />}> 
        <Route path="account" element={<BuyerAccountPage />} />
      </Route>  */}
    </Routes>
  );
}
