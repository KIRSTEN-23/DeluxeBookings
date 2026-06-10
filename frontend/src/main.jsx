import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import './index.css'
import './joe.css'

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