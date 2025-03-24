import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing_Page from './components/LandingPage/LandingPage';
import Login from './components/Login/Login';
import Sign_Up from './components/Sign_Up/Sign_Up';
import Navbar from './components/Navbar/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      {/* Navigation Bar - Visible on all pages */}
      <Navbar />
      
      {/* Main Content Area */}
      <main className="main-content">
        <Routes>
          {/* Landing Page (Home) */}
          <Route path="/" element={<Landing_Page />} />
          
          {/* Authentication Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Sign_up />} />
          
          {/* Protected/App Pages */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/appointments" element={<Appointments />} /> */}
          
          {/* Error Handling */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      {/* Footer can be added here if needed */}
    </Router>
  );
}

// Simple 404 component (create a proper one later)
const NotFound = () => (
  <div className="container">
    <h2>404 - Page Not Found</h2>
    <Link to="/">Return Home</Link>
  </div>
);

export default App;