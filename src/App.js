import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './components/LandingPage/Landing_Page';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/Sign_Up';
import InstantConsultation from './components/InstantConsultation/InstantConsultation';
import BookingConsultation from './components/BookingConsultation';
import Notification from './components/Notification/Notification';
import ReviewForm from './components/ReviewForm/ReviewForm';
import Reviews from './components/ReviewForm/Reviews';
import DoctorCardIC from './components/DoctorCardIC/DoctorCardIC';
import FindDoctorSearchIC from './components/FindDoctorSearchIC/FindDoctorSearchIC';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/InstantConsultation" element={<InstantConsultation />} />
            <Route path="/booking-consultation" element={<BookingConsultation />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/reviewform" element={<ReviewForm />} />
            <Route path="/reviews" element={<Reviews/>} />
            <Route path="/DoctorCardIC" element={<DoctorCardIC/>} />
            <Route path="/FindDoctorSearchIC" element={<FindDoctorSearchIC/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;