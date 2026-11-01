import FooterImage from "../../Assets/images/FooterImage.png"
import Logo from "../../Assets/images/Logo.png"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import deluxeLogo from '../../Assets/images/DeluxeLogo.svg'; 

function Footer() {
  return (
    <footer className="site-footer">
        <div className='footer-row'>

        <div className='footer-intro'>
            <h1 className='footerHeading'>Engage with Us in <em className='headingAlt'>Conversation</em></h1>
            <p className='footerText'>In a global world based on communication, a premium hospitality brand must look beyond its borders, open up to new experiences, and dare to be different. Meeting the brightest minds of one's time is the most effective way to nurture creativity and trust.</p>
        </div>

        <div className='footer-visual'>
            <img src={FooterImage} alt="House with swimming pool" className="footerimage"/>
        </div>

        </div>

        <div className='footer-row'>

            <div className='footer-column'>
                <p className='footerText'>About Us</p>

                <p className="footerPageLinks">Our Story</p>
                <p className="footerPageLinks">Vetting Process</p>
                <p className="footerPageLinks">Sustainability</p>
                <p className="footerPageLinks">Careers</p>
                <p className="footerPageLinks">Contact</p>
            </div>

            <div className='footer-column'>
                <p className='footerText'><strong>Customer Service</strong></p>

                <p className="footerPageLinks">Prices and Payments</p>
                <p className="footerPageLinks">Booking Policy</p>
                <p className="footerPageLinks">Return & Cancellation</p>
                <p className="footerPageLinks">Terms of Service</p>
                <p className="footerPageLinks">Privacy Policy </p>

            </div>

            <div className='footer-column'>
                <p className='footerText'><strong>Social Media</strong></p>

                <p className="footerPageLinks">Instagram</p>
                <p className="footerPageLinks">Facebook</p>
                <p className="footerPageLinks">LinkedIn</p>
                <p className="footerPageLinks">X (Twitter)</p>
            </div>

            <div className='footer-column'>
                <Link to="/"><img src={deluxeLogo} alt="Deluxe Bookings logo" className="footerimage"/></Link>
            </div>

        </div>

    </footer>
  )
}

export default Footer;