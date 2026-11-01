import { addDays, format } from "date-fns";
import { errorMessage as getErrorMessage } from "../../utils/feedback";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useEffect, useRef, useState } from "react";
import api from "../../api/config";
import DatesPicker from '../../components/listings/datePicker';
import Footer from '../../components/common/footer';
import Button from 'react-bootstrap/Button';
import { Undo2 } from 'lucide-react';
import { Send } from 'lucide-react';
import { House } from 'lucide-react';

function Checkout() {
  const listingId = new URLSearchParams(window.location.search).get("listing");
  const [listing, setListing] = useState(null);
  const [guests, setGuests] = useState(1);
  useEffect(() => {
    if (!listingId) return;
    api.get(`/listings/browse/${listingId}`).then(({ data }) => setListing(data)).catch(() => setMessage("This stay is unavailable. Return to browse and choose another listing."));
  }, [listingId]);
  const [checkoutPage, setCheckoutPage] = useState(1);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitting = useRef(false);
  const [booking, setBooking] = useState(null);

  // Personal details form
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addons, setAddons] = useState([]);
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");

  // checked addons
  const handleAddonChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setAddons([...addons, value]);
    } else {
      setAddons(addons.filter((item) => item !== value));
    }
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    if (!listing || !arrivalDate || !departureDate || departureDate <= arrivalDate || arrivalDate < new Date(new Date().setHours(0, 0, 0, 0))) {
      setMessage("Select an available stay and valid dates, with departure after arrival.");
      return;
    }
    if (!Number.isInteger(guests) || guests < 1 || guests > listing.guestCapacity) {
      setMessage(`Choose between 1 and ${listing.guestCapacity} guests.`); return;
    }
    setMessage(""); // resets message
    setCheckoutPage(2);
  };

  // Submit the booking request
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setIsSubmitting(true);
    setMessage("");

    try {
      const res = await api.post("/bookings", {
        listing: listingId,
        guests,
        firstName,
        lastName,
        email,
        phone,
        addons,
        arrivalDate: format(arrivalDate, "yyyy-MM-dd"),
        departureDate: format(departureDate, "yyyy-MM-dd")
      });

      if (res.data.success) {
        setBooking(res.data.booking);
        setMessage("");
        setCheckoutPage(3); // Show the persisted booking reference
      } else { setMessage("The server could not confirm that your booking was saved. Please try again."); }
    } catch (err) {
      console.error(err);
      setMessage(getErrorMessage(err, "Could not submit your booking. Your details are still here; please try again."));
    } finally {
      submitting.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <div className='checkoutbg'>
      {!listingId && <p role="alert">Choose a stay from <a href="/browse">Browse listings</a> before booking.</p>}
      {listing && <div className="checkout-summary"><h2>{listing.title}</h2><p>R{listing.pricePerNight} per night. Add-ons are requests for the host to confirm.</p><label>Guests <input disabled={checkoutPage !== 1} type="number" min="1" max={listing.guestCapacity} value={guests} onChange={(e) => setGuests(Number(e.target.value))} /></label>{arrivalDate && departureDate > arrivalDate && <p>Stay total: R{Math.ceil((departureDate - arrivalDate) / 86400000) * listing.pricePerNight}</p>}</div>}
      <div className='checkout-layout'>

        {/* Personal details form */}
        {checkoutPage === 1 && (
          <div className="CheckoutBack">
            <div className="CheckoutBox">

              <ProgressBar now={33} variant="dark" className='progressBar'/>

              <h3 className='m-plus-rounded-1c-bold checkoutHeading LogInText'>Enter your personal details:</h3>

              <form onSubmit={handleDetailsSubmit}>
                <div className="row">
                  <div className="col-lg-6 formGroup">
                    <label className="formFieldLabel">First Name</label>
                    <br></br>
                    <input
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-lg-6 formGroup">
                    <label className="formFieldLabel">Last Name</label>
                    <br></br>
                    <input
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <br></br>
                <div className="row">
                  <div className="col-lg-6 formGroup">
                    <label className="formFieldLabel">Email address</label>
                    <br></br>
                    <input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-lg-6 formGroup">
                    <label className="formFieldLabel">Phone number</label>
                    <br></br>
                    <input
                      type="tel"
                      placeholder="Phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <h6 className='checkoutHeading'>Select arrival day:</h6>
                  <DatesPicker selectedDate={arrivalDate} setSelectedDate={setArrivalDate} />

                  <h6 className='checkoutHeading'>Select departure day:</h6>
                  <DatesPicker selectedDate={departureDate} setSelectedDate={setDepartureDate} minDate={arrivalDate ? addDays(arrivalDate, 1) : undefined} />

                  <div className="col-lg">
                    <p className='checkoutSubHeading'>Select from our addons:</p>

                    <div className="row checkBoxAlign">
                      <label className="checkContainer">
                        <input
                          type="checkbox"
                          id="Breakfast"
                          name="select_addons"
                          value="Breakfast"
                          onChange={handleAddonChange}
                        />
                        <span className="checkmark"></span>
                        <span>
                          <h6 className='checkBoxTextA'>Breakfast</h6>
                        </span>
                      </label>

                      <br />

                      <label className="checkContainer">
                        <input
                          type="checkbox"
                          id="Housekeeping"
                          name="select_addons"
                          value="Housekeeping"
                          onChange={handleAddonChange}
                        />
                        <span className="checkmark"></span>
                        <span>
                          <h6 className='checkBoxTextB'>Housekeeping</h6>
                        </span>
                      </label>
                    </div>

                  </div>
                </div>
                <br></br>
                <Button className="primaryButton" type="submit">Finalise details</Button>
              </form>

              {message && <p role="alert" className="text-center mt-3" style={{color: 'red'}}>{message}</p>}
            </div>
          </div>
        )}

        {/* Booking review */}
        {checkoutPage === 2 && (
          <div className="CheckoutBack">
            <div className="CheckoutBox">

              <ProgressBar variant="dark" now={66} className='progressBar'/>

              <h3 className='checkoutHeading'>Review your booking:</h3>

              <form onSubmit={handleBookingSubmit}>
                <p>{firstName} {lastName} · {email}</p>
                <p>{listing?.title} · {guests} guest(s)</p>
                <p>{arrivalDate && new Date(arrivalDate).toLocaleDateString()} – {departureDate && new Date(departureDate).toLocaleDateString()}</p>
                <p>This project does not process payments. No card details are required and no email will be sent.</p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Button
                    disabled={isSubmitting}
                    onClick={() => setCheckoutPage(1)}
                    variant='light'
                    className="heroButton"
                  >
                    Go Back
                    <Undo2 className="iconStyle" style={{ marginLeft: "5%"}}/>
                  </Button>

                  <Button className="primaryButton" type="submit" disabled={isSubmitting}>{isSubmitting ? "Submitting…" : "Submit booking"} <Send className="iconStyle"/></Button>
                </div>
              </form>

              {message && <p role="alert" className="text-center mt-3" style={{color: 'red'}}>{message}</p>}
            </div>
          </div>
        )}

        {/* Booking saved */}
        {checkoutPage === 3 && (
          <div className="CheckoutBack">
            <div className="CheckoutBox" style={{ textAlign: 'center', padding: '40px 20px' }}>

              <ProgressBar variant="success" now={100} className='progressBar'/>

              <div style={{ fontSize: '50px', color: '#198754', marginBottom: '15px' }}>✓</div>

              <h3 className='checkoutHeading'>
                Booking submitted
              </h3>

              <p className='LogInText'>
                Thank you, {firstName}! Your booking was saved. Reference: <strong>{booking?._id}</strong>. Total: R{booking?.totalPrice}. No payment has been taken and no confirmation email has been sent.
              </p>

              <Button
                className="primaryButton"

                onClick={() => window.location.href = '/'}
              >
                Return Home <House className="iconStyle" style={{ marginLeft: "5%"}}/>
              </Button>
            </div>
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
}

export default Checkout;
