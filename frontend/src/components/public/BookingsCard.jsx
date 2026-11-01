import AppButton from "../common/AppButton.jsx";
import axios from "axios";

function BookingCard({ booking, refresh }) {

  const updateStatus = async (status) => {

    await axios.put(
      `http://localhost:5001/api/bookings/${booking._id}`,
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

        <AppButton intent="success" appearance="fill" onClick={() =>
            updateStatus("Accepted")
          }>
          Accept
        </AppButton>

        <AppButton intent="danger" appearance="outline" onClick={() =>
            updateStatus("Rejected")
          }>
          Reject
        </AppButton>

      </div>

    </div>
  );
}

export default BookingCard;