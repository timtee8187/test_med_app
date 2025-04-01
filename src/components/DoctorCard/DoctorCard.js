import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCard.css';
import { v4 as uuidv4 } from 'uuid';

const DoctorCard = ({
  name,
  speciality,
  experience,
  ratings,
  profilePic,
  education,
  languages,
  consultationFee,
  availability,
  about
}) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [showFullProfile, setShowFullProfile] = useState(false);

  const handleBooking = () => {
    setShowModal(true);
  };

  const handleCancel = (appointmentId) => {
    setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
  };

  const handleFormSubmit = (appointmentData) => {
    setAppointments([...appointments, { id: uuidv4(), ...appointmentData }]);
    setShowModal(false);
  };

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
          {profilePic ? (
            <img src={profilePic} alt={name} className="doctor-image" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" viewBox="0 0 16 16">
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            </svg>
          )}
        </div>

        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          
          <div className="doctor-card-meta">
            <div className="doctor-card-detail-experience">
              <span className="icon">🩺</span> {experience} years
            </div>
            <div className="doctor-card-detail-ratings">
              <span className="icon">⭐</span> {ratings}/5
            </div>
            {consultationFee && (
              <div className="doctor-card-detail-fees">
                <span className="icon">💰</span> ${consultationFee}
              </div>
            )}
          </div>

          {availability && (
            <div className="doctor-card-availability">
              <span className="icon">🕒</span> {availability}
            </div>
          )}

          {languages && languages.length > 0 && (
            <div className="doctor-card-languages">
              <span className="icon">🗣️</span> {languages.join(', ')}
            </div>
          )}

          {about && (
            <div className="doctor-card-about">
              <button 
                className="toggle-profile-btn"
                onClick={() => setShowFullProfile(!showFullProfile)}
              >
                {showFullProfile ? 'Hide Profile' : 'View Full Profile'}
              </button>
              {showFullProfile && (
                <div className="full-profile">
                  <h4>About</h4>
                  <p>{about}</p>
                  {education && (
                    <>
                      <h4>Education</h4>
                      <ul>
                        {education.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="doctor-card-options-container">
        <Popup
          trigger={
            <button className={`book-appointment-btn ${appointments.length > 0 ? 'cancel-appointment' : ''}`}>
              {appointments.length > 0 ? 'Cancel Appointment' : 'Book Now'}
            </button>
          }
          modal
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          {/* Modal content remains the same as before */}
        </Popup>
      </div>
    </div>
  );
};

export default DoctorCard;