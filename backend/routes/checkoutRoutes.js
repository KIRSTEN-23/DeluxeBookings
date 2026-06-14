const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking'); 

router.post('/bookings', async (req, res) => {
    try {
        const { firstName, lastName, email, phone, addons, arrivalDate, departureDate } = req.body;

        if (!firstName || !lastName || !email || !phone || !arrivalDate || !departureDate) {
            return res.status(400).json({ error: "Missing required personal details or booking dates." });
        }

        const newBooking = await Booking.create({
            firstName,
            lastName,
            email,
            phone,
            addons,
            checkIn: arrivalDate,   
            checkOut: departureDate, 
            
            // Placeholder data
            destination: "Default Destination", 
            suite: "Luxury Suite",
            guests: 1,
            specialRequest: ""
        });

        console.log("Guest Booking saved perfectly:", newBooking);

        return res.status(201).json({ 
            success: true, 
            message: "Guest booking saved successfully!" 
        });

    } catch (error) {
        console.error("Database Save Error:", error.message);
        return res.status(500).json({ error: "Could not write booking to database." });
    }
});

module.exports = router;