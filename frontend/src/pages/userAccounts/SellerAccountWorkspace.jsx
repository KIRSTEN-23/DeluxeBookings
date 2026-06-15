import SellerManageMyListingsSection from "../../pages/listings/SellerManageMyListingsSection.jsx";
import SellerManageMyBookingsSection from "../../pages/listings/SellerManageMyBookingsSection.jsx";

export default function SellerAccountWorkspace() {
  return (
    <div className="seller-account-workspace-shell">
      <SellerManageMyListingsSection />
      <SellerManageMyBookingsSection />
    </div>
  );
}
