import ContentState from "../../components/common/ContentState.jsx";
import { CalendarDays, TriangleAlert } from "lucide-react";
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

  return (
    <section aria-labelledby="seller-bookings-heading" className="seller-bookings-workspace">
      <h5 id="seller-bookings-heading">Guest bookings</h5>
      <div className="seller-bookings-section">
        {isLoading ? (
          <ContentState busy heading="Checking upcoming stays" description="We’re loading the bookings associated with your properties." actionLabel="Loading bookings…" />
        ) : errorMessage ? (
          <ContentState error icon={TriangleAlert} heading="Bookings couldn’t load" description={errorMessage} actionLabel="Try again" onAction={loadBookings} />
        ) : bookings.length === 0 ? (
          <ContentState icon={CalendarDays} heading="Your next guests will appear here" description="When a guest books one of your properties, you’ll see their stay and booking details in this section." actionLabel="View your listings" href="#my-listings" />
        ) : (
        <div className="seller-bookings-table-wrapper">
          <h6>Upcoming and past stays</h6>
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
      </div>
    </section>
  );
}

export default SellerManageMyBookingsSection;