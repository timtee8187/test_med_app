import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCardIC.css';
import AppointmentFormIC from '../AppointmentFormIC/AppointmentFormIC';

const DoctorCardIC = ({ 
  id,
  name, 
  speciality, 
  experience, 
  ratings, 
  profilePic,
  onBook 
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const handleBookClick = () => {
    setShowModal(true);
  };

  const handleFormSubmit = (appointmentData) => {
    // Here you would typically send the appointment data to your backend
    console.log('Appointment booked:', {
      doctorId: id,
      doctorName: name,
      ...appointmentData
    });
    
    setIsBooked(true);
    setShowModal(false);
    onBook(); // Notify parent component about the booking
  };

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
          {profilePic ? (
            <img src={profilePic} alt={name} className="doctor-photo" />
          ) : (
            <div className="default-avatar">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">{experience} years experience</div>
          <div className="doctor-card-detail-ratings">Rating: {ratings}</div>
        </div>
      </div>

      <div className="doctor-card-options-container">
        <button 
          className={`book-appointment-btn ${isBooked ? 'booked' : ''}`}
          onClick={handleBookClick}
        >
          {isBooked ? 'Appointment Booked' : 'Book Appointment'}
        </button>

        <Popup
          modal
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          {close => (
            <div className="doctor-modal-content">
              <div className="doctor-modal-header">
                <h3>Book Appointment with Dr. {name}</h3>
                <button className="close-btn" onClick={close}>×</button>
              </div>
              
              <div className="doctor-info-summary">
                <div className="doctor-image-container">
                  {profilePic ? (
                    <img src={profilePic} alt={name} />
                  ) : (
                    <div className="default-avatar">
                      {name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="doctor-details">
                  <p><strong>Speciality:</strong> {speciality}</p>
                  <p><strong>Experience:</strong> {experience} years</p>
                  <p><strong>Rating:</strong> {ratings}</p>
                </div>
              </div>

              <AppointmentFormIC 
                doctorName={name}
                doctorSpeciality={speciality}
                onSubmit={handleFormSubmit}
                onCancel={close}
              />
            </div>
          )}
        </Popup>
      </div>
    </div>
  );
};

export default DoctorCardIC;