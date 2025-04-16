import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css';

const Notification = ({ children }) => {
  const [notification, setNotification] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [appointmentData, setAppointmentData] = useState(null);
  const [doctorData, setDoctorData] = useState(null);

  const showNotification = (type, data) => {
    setNotification({ type, data });
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => setNotification(null), 500);
    }, 5000);
  };

  useEffect(() => {
    // Check for existing appointment on load
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    const storedAppointment = storedDoctorData?.name 
      ? JSON.parse(localStorage.getItem(storedDoctorData.name))
      : null;

    if (storedAppointment) {
      setAppointmentData(storedAppointment);
      setDoctorData(storedDoctorData);
      showNotification('booked', storedAppointment);
    }

    // Listen for storage events
    const handleStorageChange = (e) => {
      if (e.key === 'appointmentCancelled') {
        try {
          const cancelledData = JSON.parse(e.newValue);
          if (cancelledData) {
            setAppointmentData(null);
            showNotification('cancelled', cancelledData);
          }
        } catch (error) {
          console.error('Error parsing cancelled appointment:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Clone children to inject onAppointmentChange prop
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        onAppointmentChange: (type, data) => {
          if (type === 'booked') {
            setAppointmentData(data);
            setDoctorData({ 
              name: data.doctorName, 
              speciality: data.doctorSpeciality 
            });
            showNotification('booked', data);
          } else {
            setAppointmentData(null);
            showNotification('cancelled', data);
          }
        }
      });
    }
    return child;
  });

  return (
    <div>
      <Navbar />
      {childrenWithProps}
      
      {/* Notification */}
      {notification && (
        <div className={`notification ${notification.type} ${isVisible ? 'visible' : ''}`}>
          <div className="notification-content">
            <h3>
              {notification.type === 'booked' 
                ? 'Appointment Booked!' 
                : 'Appointment Cancelled'}
            </h3>
            {notification.data && doctorData && (
              <div className="appointment-details">
                <p><strong>Doctor:</strong> {doctorData.name}</p>
                <p><strong>Speciality:</strong> {doctorData.speciality}</p>
                {notification.type === 'booked' && (
                  <>
                    <p><strong>Name:</strong> {notification.data.name}</p>
                    <p><strong>Phone:</strong> {notification.data.phoneNumber}</p>
                    <p><strong>Date:</strong> {notification.data.date}</p>
                    <p><strong>Time:</strong> {notification.data.time}</p>
                  </>
                )}
              </div>
            )}
            {notification.type === 'booked' && appointmentData && (
              <button 
                className="cancel-btn"
                onClick={() => {
                  localStorage.removeItem(doctorData.name);
                  localStorage.setItem('appointmentCancelled', JSON.stringify(appointmentData));
                  setAppointmentData(null);
                  showNotification('cancelled', appointmentData);
                }}
              >
                Cancel Appointment
              </button>
            )}
          </div>
        </div>
      )}

      {/* Persistent appointment card */}
      {appointmentData && doctorData && !notification && (
        <div className="appointment-card">
          <div className="appointment-card__content">
            <h3>Appointment Details</h3>
            <div className="appointment-details">
              <p><strong>Doctor:</strong> {doctorData.name}</p>
              <p><strong>Speciality:</strong> {doctorData.speciality}</p>
              <p><strong>Name:</strong> {appointmentData.name}</p>
              <p><strong>Phone:</strong> {appointmentData.phoneNumber}</p>
              <p><strong>Date:</strong> {appointmentData.date}</p>
              <p><strong>Time:</strong> {appointmentData.time}</p>
            </div>
            <button 
              className="cancel-btn"
              onClick={() => {
                localStorage.removeItem(doctorData.name);
                localStorage.setItem('appointmentCancelled', JSON.stringify(appointmentData));
                setAppointmentData(null);
                showNotification('cancelled', appointmentData);
              }}
            >
              Cancel Appointment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;