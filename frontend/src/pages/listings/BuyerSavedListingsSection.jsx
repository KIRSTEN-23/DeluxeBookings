import { Alert } from "react-bootstrap";

export default function BuyerSavedListingsSection() {
  return (
    <section className="buyer-saved-listings-section">
      <div className="mb-3">
        <h2 className="h4 mb-1">Saved Listings</h2>
        <p className="text-muted mb-0">
          View and manage your saved properties.
        </p>
      </div>

      <Alert variant="light" className="border mb-0">
        Saved listings will be implemented later.
      </Alert>
    </section>
  );
}