import { Route } from "react-router-dom";

import BuyerListingDetails from "../pages/buyer/BuyerListingDetails";

export default function BuyerRoutes() {
  return (
    <>
      <Route path="/listings/:id" element={<BuyerListingDetails />} />
    </>
  );
}
