import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css';

const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    const checkAuthAndData = () => {
      const storedUsername = sessionStorage.getItem('email');
      const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
      const storedAppointmentData = JSON.parse(localStorage.getItem(storedDoctorData?.name));
      const storedNotificationType = localStorage.getItem('notificationType');
      const storedNotificationMessage = localStorage.getItem('notificationMessage');

      setIsLoggedIn(!!storedUsername);
      
      if (storedDoctorData) setDoctorData(storedDoctorData);
      if (storedAppointmentData) {
        setAppointmentData(storedAppointmentData);
        setShowNotification(true);
      }
      if (storedNotificationType) setNotificationType(storedNotificationType);
      if (storedNotificationMessage) setNotificationMessage(storedNotificationMessage);
    };

    checkAuthAndData();

    const handleStorageChange = (e) => {
      if (e.key === 'appointmentData') {
        const newAppointmentData = JSON.parse(e.newValue);
        setAppointmentData(newAppointmentData);
        setShowNotification(true);
        setNotificationType('booked');
        setNotificationMessage('Your appointment has been booked successfully!');
      } else if (e.key === 'appointmentCancelled') {
        const cancelledData = JSON.parse(e.newValue);
        setAppointmentData(cancelledData);
        setShowNotification(true);
        setNotificationType('cancelled');
        setNotificationMessage('Your appointment has been cancelled.');
      } else if (e.key === 'hideNotification') {
        setShowNotification(false);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleClose = () => {
    setShowNotification(false);
    localStorage.removeItem('notificationType');
    localStorage.removeItem('notificationMessage');
    localStorage.setItem('hideNotification', 'true');
  };

  return (
    <div>
      <Navbar />
      {children}
      {isLoggedIn && showNotification && (
        <div className={`notification-container ${notificationType}`}>
          <div className="notification-card">
            <div className="notification-content">
              <h3 className="notification-title">
                {notificationType === 'booked' ? '✅ Appointment Booked' : '❌ Appointment Cancelled'}
              </h3>
              <p className="notification-message">{notificationMessage}</p>
              {appointmentData && (
                <div className="appointment-details">
                  <p><strong>Doctor:</strong> Dr. {doctorData?.name}</p>
                  <p><strong>Speciality:</strong> {doctorData?.speciality}</p>
                  {notificationType === 'booked' && (
                    <>
                      <p><strong>Date:</strong> {appointmentData.date}</p>
                      <p><strong>Time:</strong> {appointmentData.time}</p>
                    </>
                  )}
                </div>
              )}
              <button className="notification-close-btn" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;