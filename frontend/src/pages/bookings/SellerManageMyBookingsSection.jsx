import { Alert } from "react-bootstrap";

export default function SellerManageMyBookingsSection() {
  return (
    <section className="seller-bookings-section">
      <div className="d-flex justify-content-between align-items-end gap-3 flex-wrap mb-3">
        <div>
          <h2 className="h4 mb-1">Booking Management</h2>
          <p className="text-muted mb-0">
            View and manage bookings for your properties.
          </p>
        </div>
      </div>

      <Alert variant="light" className="border mb-0">
        Booking management will be added later.
      </Alert>
    </section>
  );
}