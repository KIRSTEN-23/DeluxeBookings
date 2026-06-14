import axios from "axios";

import "./BookingsCard.css";

function BookingCard({ booking, refresh }) {

  const updateStatus = async (status) => {

    await axios.put(
      `http://localhost:5000/api/bookings/${booking._id}`,
      { status }
    );

    refresh();
  };

  return (

    <div className="booking-card">

      <h3>{booking.propertyName}</h3>

      <p>Customer: {booking.customerName}</p>

      <p>
        {new Date(booking.checkIn)
          .toLocaleDateString()}
      </p>

      <p>Status: {booking.status}</p>

      <div className="buttons">

        <button
          onClick={() =>
            updateStatus("Accepted")
          }
        >
          Accept
        </button>

        <button
          onClick={() =>
            updateStatus("Rejected")
          }
        >
          Reject
        </button>

      </div>

    </div>
  );
}

export default BookingCard;