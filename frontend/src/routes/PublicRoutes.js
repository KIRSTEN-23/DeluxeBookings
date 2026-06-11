import { Route } from "react-router-dom";

import BrowsePage from "../pages/public/BrowsePage";
import AccountPage from "../pages/account/AccountPage";
import SellerOnboarding from "../pages/seller/SellerOnboarding";

export default function PublicRoutes() {
  return (
    <>
      <Route path="/" element={<BrowsePage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/seller/onboarding" element={<SellerOnboarding />} />

    </>
  );
}