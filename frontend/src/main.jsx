import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App.jsx'

import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css'
import './joe.css'
import "./styles/AboutSection.css";
import "./styles/BookingsCard.css";
import "./styles/Carousel.css";
import "./styles/Hero.css";
import "./styles/LuxurySection.css";
import "./styles/OfferSection.css";
import "./styles/PropertyGrid.css";
import "./styles/ReviewForm.css";

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { AuthProvider } from './context/authContext' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <AuthProvider> 
      <App />
    </AuthProvider>


  </React.StrictMode>
)