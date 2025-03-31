import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';  // Standard filename
import LandingPage from './components/LandingPage/Landing_Page';  // Note underscore
import Login from './components/Login/Login';  // Standard filename
import SignUp from './components/SignUp/Sign_Up';  // Note underscore
import InstantConsultation from './components/InstantConsultationBooking/InstantConsultation';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        {/* Navbar that appears on every page */}
        <Navbar />
        
        {/* Main content area with routes */}
        <div className="content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/InstantConsultation" element={<InstantConsultation />} />

            {/* 404 page fallback */}
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;