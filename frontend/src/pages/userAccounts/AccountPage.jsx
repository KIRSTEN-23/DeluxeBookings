import ContentState from "../../components/common/ContentState.jsx";
import { Compass } from "lucide-react";
import { useAuth } from "../../context/authContext";
import AccountProfile from "../listings/BuyerSavedListingsSection.jsx";
import SellerAccountWorkspace from "./SellerAccountWorkspace.jsx";
import AdminListingQueueSection from "../listings/AdminListingQueueSection.jsx";
import "../../styles/AccountPage.css";

export default function AccountPage({ view = "profile" }) {
  const { user, isSeller, isAdmin } = useAuth();
  const isActivity = view === "activity";
  const intro = isActivity
    ? isAdmin ? "Review submitted property listings." : isSeller ? "Manage your property listings and bookings." : "Find your next stay."
    : "View and update your account details.";

  return (
    <main className="account-page">
      <header className="account-page__hero">
        <div className="account-page__hero-content">
          <p className="account-page__eyebrow">Your account</p>
          <h1 className="account-page__title">{isActivity ? "My Activity" : "My Profile"}</h1>
          <p className="account-page__intro">{intro}</p>
        </div>
      </header>

      {isActivity ? (
        user && <div className="account-workspace">
          {isAdmin ? <AdminListingQueueSection /> : isSeller ? <SellerAccountWorkspace /> : (
            <section className="account-activity-intro">
              <ContentState framed icon={Compass} heading="Find your next escape" description="Explore properties and discover a stay for your next trip." actionLabel="Browse stays" to="/product" />
            </section>
          )}
        </div>
      ) : (
        <div className="account-profile"><AccountProfile /></div>
      )}
    </main>
  );
}
