import React, { useEffect, useState } from 'react';
import './Notification.css';
import Navbar from '../Navbar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCalendarCheck, faCalendarTimes } from '@fortawesome/free-solid-svg-icons';

const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [showNotification, setShowNotification] = useState(true);
  const [notificationType, setNotificationType] = useState('booking'); // 'booking' or 'cancellation'

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    const storedAppointmentData = JSON.parse(localStorage.getItem(storedDoctorData?.name));

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    if (storedDoctorData) {
      setDoctorData(storedDoctorData);
    }

    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
      // Check if this is a cancellation
      if (storedAppointmentData.status === 'cancelled') {
        setNotificationType('cancellation');
      }
    }
  }, []);

  const handleCancelAppointment = () => {
    if (doctorData && appointmentData) {
      // Update appointment status to cancelled
      const updatedAppointment = {
        ...appointmentData,
        status: 'cancelled',
        cancellationTime: new Date().toISOString()
      };
      
      // Save back to localStorage
      localStorage.setItem(doctorData.name, JSON.stringify(updatedAppointment));
      setAppointmentData(updatedAppointment);
      setNotificationType('cancellation');
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <div>
      <Navbar />
      {children}
      
      {isLoggedIn && appointmentData && showNotification && (
        <div className={`notification ${notificationType}`}>
          <div className="notification-header">
            {notificationType === 'booking' ? (
              <FontAwesomeIcon icon={faCalendarCheck} className="notification-icon" />
            ) : (
              <FontAwesomeIcon icon={faCalendarTimes} className="notification-icon" />
            )}
            <h3>
              {notificationType === 'booking' 
                ? 'Appointment Booked!' 
                : 'Appointment Cancelled'}
            </h3>
            <button className="close-btn" onClick={handleCloseNotification}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          
          <div className="notification-body">
            <div className="notification-detail">
              <span className="detail-label">Patient:</span>
              <span>{username}</span>
            </div>
            <div className="notification-detail">
              <span className="detail-label">Doctor:</span>
              <span>{doctorData?.name}</span>
            </div>
            <div className="notification-detail">
              <span className="detail-label">Specialty:</span>
              <span>{doctorData?.speciality}</span>
            </div>
            {appointmentData.date && (
              <div className="notification-detail">
                <span className="detail-label">Date:</span>
                <span>{new Date(appointmentData.date).toLocaleDateString()}</span>
              </div>
            )}
            {appointmentData.time && (
              <div className="notification-detail">
                <span className="detail-label">Time:</span>
                <span>{appointmentData.time}</span>
              </div>
            )}
            {notificationType === 'booking' && (
              <button 
                className="cancel-btn"
                onClick={handleCancelAppointment}
              >
                Cancel Appointment
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;