import AppButton from "./AppButton.jsx";
import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import deluxeLogo from '../../Assets/images/DeluxeLogo.svg'; 
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/authContext'; // authorisation

function NavBar() {
  const navRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const updateHeight = () => nav.parentElement.style.setProperty("--site-nav-height", `${nav.getBoundingClientRect().height}px`);
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(nav);
    return () => observer.disconnect();
  }, []);

  const { token, user, isAdmin, isSeller } = useAuth();

  const isLoggedIn = !!token && !!user;
  // Check user role
  const hasDashboardAccess = isAdmin || isSeller;

  return (
    <Navbar ref={navRef} expanded={expanded} onToggle={setExpanded} expand={false} className="Navbar" sticky="top" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>
          <NavLink to="/"><img src={deluxeLogo} alt="Deluxe Bookings logo" className='logoStyling'/></NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="site-navigation" />
        <Navbar.Collapse id="site-navigation">
          <Nav className="site-nav-links">
            <Nav.Link className="navItemsSpacing" as="div">
              <NavLink to="/product" className="pagelinks">
                <h5 style={{color: 'white'}}>Stays</h5>
              </NavLink>
            </Nav.Link>
            
            {!hasDashboardAccess && (
              <Nav.Link className="navItemsSpacing" as="div">
                <NavLink to="/seller-onboarding" className="pagelinks">
                  <h5 className="PageLinkwidth" style={{ color: 'white' }}>List your property</h5>
                </NavLink>
              </Nav.Link>
            )}

            {/* Conditional rendering */}
            {!isLoggedIn ? (
              // Shows if user isn't logged in
              <Nav.Link className="navItemsSpacing" as="div">
                <AppButton as={NavLink} to="/login" intent="primary" appearance="fill" onDark className="navButton" icon={ArrowUpRight}>Sign up</AppButton>
              </Nav.Link>
            ) : (
              <NavDropdown
                id="account-navigation"
                className="navItemsSpacing account-nav"
                align="end"
                title={<span className="account-nav__label">Account <ChevronDown size={20} aria-hidden="true" /></span>}
              >
                <NavDropdown.Item as={NavLink} to="/account/profile" onClick={() => setExpanded(false)}>
                  My Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/account/activity" onClick={() => setExpanded(false)}>
                  My Activity
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar;