import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './components/LandingPage/Landing_Page';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/Sign_Up';
import InstantConsultation from './components/InstantConsultation/InstantConsultation';
import BookingConsultation from './components/BookingConsultation';
import DoctorCardIC from './components/DoctorCardIC/DoctorCardIC';
import FindDoctorSearchIC from './components/FindDoctorSearchIC/FindDoctorSearchIC';
import AppointmentFormIC from './components/AppointmentFormIC/AppointmentFormIC';
import Notification from './components/Notification/Notification';
import ReviewForm from './components/ReviewForm/ReviewForm';
import ReviewsTable from './components/ReviewForm/ReviewsTable';
import './App.css';

function App() {
  // State for review form
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const [reviews, setReviews] = useState([]);

  // Handler for review submission
  const handleReviewSubmit = (reviewData) => {
    setReviews([...reviews, reviewData]);
    setShowReviewForm(false);
    // Here you would typically send the review to your backend
    console.log('Review submitted:', reviewData);
  };

  // Create wrapped DoctorCard component with review functionality
  const DoctorCardWithReview = (props) => {
    return (
      <DoctorCardIC 
        {...props}
        onReviewClick={() => {
          setCurrentDoctor({
            name: props.name,
            speciality: props.speciality
          });
          setShowReviewForm(true);
        }}
      />
    );
  };

  return (
    <div className="App">
      <Router>
        <Notification>
          <div className="app">
            <Navbar />
            
            <div className="content">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/instant-consultation" element={<InstantConsultation />} />
                <Route 
                  path="/booking-consultation" 
                  element={
                    <BookingConsultation 
                      DoctorCardComponent={DoctorCardWithReview}
                      SearchComponent={FindDoctorSearchIC}
                      AppointmentFormComponent={AppointmentFormIC}
                    />
                  } 
                />
                <Route 
                  path="/reviews" 
                  element={<ReviewsTable reviews={reviews} />} 
                />
                <Route path="*" element={<div>Page Not Found</div>} />
              </Routes>
            </div>

            {/* Review Form Modal */}
            {showReviewForm && currentDoctor && (
              <ReviewForm
                doctorName={currentDoctor.name}
                doctorSpeciality={currentDoctor.speciality}
                onSubmit={handleReviewSubmit}
                onClose={() => setShowReviewForm(false)}
              />
            )}
          </div>
        </Notification>
      </Router>
    </div>
  );
}

export default App;