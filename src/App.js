import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './components/LandingPage/Landing_Page'; // Corrected path
import Login from './components/Login/Login';
import SignUp from './components/SignUp/Sign_Up';
import InstantConsultation from './components/InstantConsultation/InstantConsultation';
import BookingConsultation from './components/BookingConsultation';
import DoctorCardIC from './components/DoctorCardIC/DoctorCardIC';
import FindDoctorSearchIC from './components/FindDoctorSearchIC/FindDoctorSearchIC';
import AppointmentFormIC from './components/AppointmentFormIC/AppointmentFormIC';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        
        <div className="content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/InstantConsultation" element={<InstantConsultation />} />
            <Route 
              path="/BookingConsultation" 
              element={
                <BookingConsultation 
                  DoctorCardComponent={DoctorCardIC}
                  SearchComponent={FindDoctorSearchIC}
                  AppointmentFormComponent={AppointmentFormIC}
                />
              } 
            />
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;