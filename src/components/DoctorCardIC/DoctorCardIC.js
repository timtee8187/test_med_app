import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCardIC.css';
import AppointmentFormIC from '../AppointmentFormIC/AppointmentFormIC';
import { v4 as uuidv4 } from 'uuid';

const DoctorCardIC = ({ name, speciality, experience, ratings, profilePic }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);

  // Removed unused handleBooking function since we're using onClick directly
  const handleCancel = (appointmentId) => {
    setAppointments(prev => prev.filter(app => app.id !== appointmentId));
  };

  const handleFormSubmit = (appointmentData) => {
    setAppointments(prev => [...prev, { id: uuidv4(), ...appointmentData }]);
    setShowModal(false);
  };

  return (
    <div className="doctor-card-container">
      {/* Doctor Info Section - Unchanged */}
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

      {/* Booking Section - Now using setShowModal directly */}
      <div className="doctor-card-options-container">
        <Popup
          style={{ backgroundColor: '#FFFFFF' }}
          trigger={
            <button 
              className={`book-appointment-btn ${appointments.length > 0 ? 'cancel-appointment' : ''}`}
              onClick={() => setShowModal(true)}  // Directly using setShowModal here
            >
              {appointments.length > 0 ? 'Cancel Appointment' : 'Book Appointment'}
              <div>No Booking Fee</div>
            </button>
          }
          modal
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          {close => (
            <div className="doctorbg" style={{ height: '100vh', overflow: 'scroll' }}>
              {/* Modal content remains unchanged */}
              <div>
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

              {appointments.length > 0 ? (
                <div style={{ textAlign: 'center' }}>
                  <h3>Appointment Booked!</h3>
                  {appointments.map(appointment => (
                    <div className="bookedInfo" key={appointment.id}>
                      <p>Name: {appointment.name}</p>
                      <p>Phone: {appointment.phoneNumber}</p>
                      <button 
                        onClick={() => {
                          handleCancel(appointment.id);
                          close();
                        }}
                        className="cancel-btn"
                      >
                        Cancel Appointment
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <AppointmentFormIC 
                  doctorName={name} 
                  doctorSpeciality={speciality} 
                  onSubmit={(data) => {
                    handleFormSubmit(data);
                    close();
                  }} 
                />
              )}
            </div>
          )}
        </Popup>
      </div>
    </div>
  );
};

export default DoctorCardIC;