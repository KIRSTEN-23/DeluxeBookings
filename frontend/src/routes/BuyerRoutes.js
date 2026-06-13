import { Route } from "react-router-dom";

import BrowsePage from "../pages/public/BrowseListings";
import BuyerAccountPage from "../pages/userAccounts/BuyerAccountPage";
import SellerOnboarding from "../pages/seller/SellerOnboarding";
import BuyerListingDetails from "../pages/listings/BuyerListingDetails";

export default function BuyerRoutes() {
  return (
    <>
      <Route path="/" element={<BrowsePage />} />
      
      <Route element={<ProtectedRoutes minLevel={1} />}> 
        <Route path="/account" element={<BuyerAccountPage />} />
      </Route>
      
      <Route path="/seller/onboarding" element={<SellerOnboarding />} />
      <Route path="/listings/:id" element={<BuyerListingDetails />} />
    </>
  );
}
