import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import deluxeLogo from '../../Assets/images/DeluxeLogo.svg'; 
import Button from 'react-bootstrap/Button';
import { ArrowUpRight } from 'lucide-react';
import { useAuth } from '../../context/authContext'; // authorisation

function NavBar() {
  const { token, user, isAdmin, isSeller, logout } = useAuth();
  const navigate = useNavigate();

  const isLoggedIn = !!token && !!user;
  // Check user role
  const hasDashboardAccess = isAdmin || isSeller;

  const handleSignOut = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="Navbar" sticky="top" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>
          <NavLink to="/"><img src={deluxeLogo} alt="Deluxe Bookings logo" className='logoStyling'/></NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="navItemsSpacing col-4" as="div">
              <NavLink to="/product" className="pagelinks">
                <h5>Stays</h5>
              </NavLink>
            </Nav.Link>
            
            {/* Checks if user has seller role */}
            <Nav.Link className="navItemsSpacing col-12" as="div">
              <NavLink to={hasDashboardAccess ? "/seller-dashboard/account" : "/seller-onboarding"} className="pagelinks">
                <h5 className="PageLinkwidth">{hasDashboardAccess ? "Seller Dashboard" : "List your property"}</h5>
              </NavLink>
            </Nav.Link>

            {/* Conditional rendering */}
            {!isLoggedIn ? (
              // Shows if user isn't logged in
              <Nav.Link className="navItemsSpacing" as="div">
                <NavLink to="/login">
                  <Button variant="light" className="navButton">Sign up <ArrowUpRight className="iconStyle"/></Button>
                </NavLink>
              </Nav.Link>
            ) : (
              <Nav.Link className="navItemsSpacing" as="div">
                <NavLink to="/account" className="pagelinks">
                  <h5>Account</h5>
                </NavLink>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar;