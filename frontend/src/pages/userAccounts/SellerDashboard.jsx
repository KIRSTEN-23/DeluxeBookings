import { useEffect, useState } from "react";
import axios from "axios";
import "./BookingsCard.css";

function SellerDashboard() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/bookings"
    );

    setBookings(res.data);
  };

  return (
    <div className="dashboard">

      <h1>Booking Management</h1>

      {bookings.map((booking) => (
        <BookingCard
          key={booking._id}
          booking={booking}
          refresh={fetchBookings}
        />
      ))}

    </div>
  );
}

export default SellerDashboard;