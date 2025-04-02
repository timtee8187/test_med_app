import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCardIC.css';
import AppointmentFormIC from '../AppointmentFormIC/AppointmentFormIC';
import { v4 as uuidv4 } from 'uuid';

const DoctorCardIC = ({ name, speciality, experience, ratings, profilePic }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);

  // Cancel appointment handler
  const handleCancel = (appointmentId) => {
    setAppointments(prev => prev.filter(app => app.id !== appointmentId));
  };

  // Book appointment handler
  const handleFormSubmit = (appointmentData) => {
    setAppointments(prev => [...prev, { 
      id: uuidv4(), 
      ...appointmentData,
      doctorName: name,
      doctorSpeciality: speciality
    }]);
    setShowModal(false); // Close modal after booking
  };

  return (
    <div className="doctor-card-container">
      {/* Doctor Info Section */}
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
          <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
          </svg>
        </div>
        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">{experience} years experience</div>
          <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
        </div>
      </div>

      {/* Booking/Cancellation Section */}
      <div className="doctor-card-options-container">
        {appointments.length > 0 ? (
          // Cancel Appointment Button (shown when booked)
          <button 
            className="cancel-appointment-btn"
            onClick={() => handleCancel(appointments[0].id)} // Cancel the first (only) appointment
          >
            Cancel Appointment
            <div>No Cancellation Fee</div>
          </button>
        ) : (
          // Book Appointment Button (shown when not booked)
          <Popup
            trigger={
              <button className="book-appointment-btn">
                Book Appointment
                <div>No Booking Fee</div>
              </button>
            }
            modal
            open={showModal}
            onClose={() => setShowModal(false)}
          >
            {close => (
              <div className="doctorbg">
                {/* Doctor Info in Modal */}
                <div className="doctor-card-details">
                  <div className="doctor-card-detail-name">{name}</div>
                  <div className="doctor-card-detail-speciality">{speciality}</div>
                </div>

                {/* Appointment Form */}
                <AppointmentFormIC
                  doctorName={name}
                  doctorSpeciality={speciality}
                  onSubmit={(data) => {
                    handleFormSubmit(data);
                    close();
                  }}
                />
              </div>
            )}
          </Popup>
        )}
      </div>
    </div>
  );
};

export default DoctorCardIC;