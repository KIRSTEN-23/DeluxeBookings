import { Alert } from "react-bootstrap";

export default function AdminListingQueueSection() {
  return (
    <section className="admin-listing-queue-section">
      <div className="mb-3">
        <h2 className="h4 mb-1">Listing Review Queue</h2>
        <p className="text-muted mb-0">
          Review submitted listings awaiting approval.
        </p>
      </div>

      <Alert variant="light" className="border mb-0">
        Listing review queue will be implemented later.
      </Alert>
    </section>
  );
}