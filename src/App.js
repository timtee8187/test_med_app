import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './components/LandingPage/Landing_Page';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/Sign_Up';
import InstantConsultation from './components/InstantConsultation/InstantConsultation';
import AppointmentFormIC from './components/AppointmentFormIC/AppointmentFormIC';
import Notification from './components/Notification/Notification';
import ReviewForm from './components/ReviewForm/ReviewForm';
import Reviews from './components/ReviewForm/Reviews';
import DoctorCardIC from './components/DoctorCardIC/DoctorCardIC';
import FindDoctorSearchIC from './components/FindDoctorSearchIC/FindDoctorSearchIC';
import ProfileCard from './components/ProfileCard/ProfileCard';
import ReportsLayout from './components/ReportsLayout/ReportsLayout';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Notification>
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/InstantConsultation" element={<InstantConsultation />} />
              <Route path="/AppointmentFormIC" element={<AppointmentFormIC />} />
              <Route path="/reviewform" element={<ReviewForm />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/DoctorCardIC" element={<DoctorCardIC />} />
              <Route path="/FindDoctorSearchIC" element={<FindDoctorSearchIC />} />
              <Route path="/ProfileCard" element={<ProfileCard />} />
              <Route path="/ReportsLayout" element={<ReportsLayout />} />
            </Routes>
          </div>
        </Notification>
      </BrowserRouter>
    </div>
  );
}

export default App;