import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCardIC.css';
import AppointmentFormIC from '../AppointmentFormIC/AppointmentFormIC';
import { v4 as uuidv4 } from 'uuid';

const DoctorCardIC = ({ name, speciality, experience, ratings, onAppointmentChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const handleFormSubmit = (appointmentData) => {
    const newAppointment = {
      id: uuidv4(),
      doctorName: name,
      doctorSpeciality: speciality,
      ...appointmentData,
      date: appointmentData.date || new Date().toLocaleDateString(),
      time: appointmentData.time || new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };

    // Save to localStorage
    localStorage.setItem('doctorData', JSON.stringify({ name, speciality }));
    localStorage.setItem(name, JSON.stringify(newAppointment));
    
    setAppointments([newAppointment]);
    setShowModal(false);
    
    // Trigger notification
    if (onAppointmentChange) {
      onAppointmentChange('booked', newAppointment);
    }
  };

  const handleCancel = (appointmentId) => {
    const [cancelledAppointment] = appointments.filter(app => app.id === appointmentId);
    const updatedAppointments = appointments.filter(app => app.id !== appointmentId);
    
    setAppointments(updatedAppointments);
    
    // Update localStorage
    localStorage.removeItem(name);
    localStorage.setItem('appointmentCancelled', JSON.stringify(cancelledAppointment));
    
    // Trigger notification
    if (onAppointmentChange) {
      onAppointmentChange('cancelled', cancelledAppointment);
    }
  };

  const renderStars = () => {
    const fullStars = Math.floor(ratings);
    const hasHalfStar = ratings % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <>
        {'★'.repeat(fullStars)}
        {hasHalfStar && '½'}
        {'☆'.repeat(emptyStars)}
      </>
    );
  };

  return (
    <div className="doctor-card">
      <div className="doctor-info-section">
        <div className="doctor-avatar">
          <i className="fas fa-user-md"></i>
        </div>
        <div className="doctor-details">
          <h3 className="doctor-name">{name}</h3>
          <p className="doctor-speciality">{speciality}</p>
          <p className="doctor-experience">{experience} years experience</p>
          <p className="doctor-ratings">Ratings: {renderStars()}</p>
        </div>
      </div>

      <Popup
        trigger={
          <button className={`book-appointment-btn ${appointments.length > 0 ? 'cancel-appointment' : ''}`}>
            <div>{appointments.length > 0 ? 'Cancel Appointment' : 'Book Appointment'}</div>
            <div>No Booking Fee</div>
          </button>
        }
        modal
        open={showModal}
        onClose={() => setShowModal(false)}
        contentStyle={{
          width: '90%',
          maxWidth: '500px',
          borderRadius: '8px',
          padding: '20px'
        }}
      >
        {close => (
          <div className="appointment-modal">
            <div className="modal-header">
              <h3>Book Appointment with {name}</h3>
              <button className="close-modal" onClick={close}>
                &times;
              </button>
            </div>
            
            <div className="doctor-info-modal">
              <div className="doctor-avatar">
                <i className="fas fa-user-md"></i>
              </div>
              <div className="doctor-details">
                <h4>{name}</h4>
                <p>{speciality}</p>
                <p>{experience} years experience</p>
                <p>Ratings: {renderStars()}</p>
              </div>
            </div>

            {appointments.length > 0 ? (
              <div className="appointment-confirmed">
                <h4>Appointment Booked!</h4>
                {appointments.map(appointment => (
                  <div key={appointment.id} className="appointment-info">
                    <p><strong>Name:</strong> {appointment.name}</p>
                    <p><strong>Phone:</strong> {appointment.phoneNumber}</p>
                    <p><strong>When:</strong> {appointment.date} at {appointment.time}</p>
                    <button 
                      onClick={() => handleCancel(appointment.id)}
                      className="cancel-btn"
                    >
                      Cancel Appointment
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <AppointmentFormIC onSubmit={handleFormSubmit} onCancel={close} />
            )}
          </div>
        )}
      </Popup>
    </div>
  );
};

export default DoctorCardIC;