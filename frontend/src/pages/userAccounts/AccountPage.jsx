import { useState } from "react";

// import AccountRoleTabs from "../../components/common/AccountRoleTabs.jsx";

import BuyerSavedListingsSection from "../../pages/listings/BuyerSavedListingsSection.jsx";
import SellerAccountWorkspace from "../../pages/userAccounts/SellerAccountWorkspace.jsx";
import AdminListingQueueSection from "../../pages/listings/AdminListingQueueSection.jsx";

import "../../styles/AccountPage.css";

export default function AccountPage() {
  const [activeRole, setActiveRole] = useState("seller");

  return (
    <main className="account-page">
      <header className="account-page__hero">
        <div className="account-page__hero-content">
          <p className="account-page__eyebrow">Deluxe workspace</p>
          <h1 className="account-page__title">Account</h1>
          <p className="account-page__intro">
            Manage your listings, bookings, saved stays, and review workflows.
          </p>
            <BuyerSavedListingsSection/>
          {/* <AccountRoleTabs
            activeRole={activeRole}
            onRoleChange={setActiveRole}
          /> */}

        </div>
      </header>

      <div className="account-workspace">
        {activeRole === "buyer" && (
          <>
            <BuyerSavedListingsSection />
          </>
        )}

        {activeRole === "seller" && (
          <SellerAccountWorkspace />
        )}

        {activeRole === "admin" && (
          <>
            <AdminListingQueueSection />
          </>
        )}
      </div>
    </main>
  );
}
