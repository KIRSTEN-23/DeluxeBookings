import { Alert } from "react-bootstrap";

export default function SellerManageMyBookingsSection() {
  return (
    <section className="seller-bookings-section">
      <div className="mb-3">
        <h2 className="h4 mb-1">Booking Management</h2>
        <p className="text-muted mb-0">
          View and manage bookings for your properties.
        </p>
      </div>

      <Alert variant="light" className="border mb-0">
        Booking management will be implemented later.
      </Alert>
    </section>
  );
}