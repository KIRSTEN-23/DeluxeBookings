import { useEffect, useState } from "react";

import { getSellerBookings } from "../../api/sellerApi";

function SellerManageMyBookingsSection() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const data = await getSellerBookings();
      setBookings(data);
    } catch (error) {
      setErrorMessage("Could not load seller bookings.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <p>Loading bookings...</p>;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  return (
    <section className="seller-bookings-section">
      <div className="seller-bookings-header">
        <h2>Booking Management</h2>
        <p>Review upcoming guest stays, revenue, and booking status.</p>
      </div>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="seller-bookings-table-wrapper">
          <table className="seller-bookings-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Property</th>
                <th>Guest</th>
                <th>Check-in</th>
                <th>Nights</th>
                <th>Revenue</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.bookingId || booking._id}</td>
                  <td>{booking.propertyName}</td>
                  <td>{booking.customerName}</td>
                  <td>
                    {booking.checkIn
                      ? new Date(booking.checkIn).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "—"}
                  </td>
                  <td>{booking.nights || "—"}</td>
                  <td>
                    {booking.totalPrice
                      ? `R${booking.totalPrice.toLocaleString()}`
                      : "—"}
                  </td>
                  <td>
                    <span className={`booking-status ${booking.status?.toLowerCase()}`}>
                      {booking.status || "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default SellerManageMyBookingsSection;