import { useState } from "react";
import axios from "axios";

import "./CustomerBooking.css";

function CustomerBooking() {

  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    propertyName: "",
    checkIn: "",
    checkOut: "",
    guests: 1
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
      e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/bookings",
        formData
      );

      alert(
        "Booking Submitted Successfully"
      );

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <div className="booking-container">

      <h1>Book Luxury Stay</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="customerName"
          placeholder="Full Name"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="text"
          name="propertyName"
          placeholder="Property Name"
          onChange={handleChange}
        />

        <input
          type="date"
          name="checkIn"
          onChange={handleChange}
        />

        <input
          type="date"
          name="checkOut"
          onChange={handleChange}
        />

        <input
          type="number"
          name="guests"
          placeholder="Guests"
          onChange={handleChange}
        />

        <button>
          Submit Booking
        </button>

      </form>

    </div>
  );
}

export default CustomerBooking;