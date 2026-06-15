import SellerManageMyListingsSection from "../../pages/listings/SellerManageMyListingsSection.jsx";
import SellerManageMyBookingsSection from "../bookings/SellerManageMyBookingsSection.jsx";

export default function SellerAccountWorkspace() {
  return (
    <div className="seller-account-workspace-shell">
      <SellerManageMyListingsSection />
      <SellerManageMyBookingsSection />
    </div>
  );
}
