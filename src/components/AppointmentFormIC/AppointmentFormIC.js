import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AppointmentFormIC.css';

const AppointmentFormIC = ({ doctor: propDoctor, onSubmit, onCancel }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(propDoctor || {});
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    date: '',
    timeSlot: ''
  });

  // Get doctor data from various sources with fallbacks
  useEffect(() => {
    const getDoctorData = () => {
      // 1. Check props first
      if (propDoctor) return;
      
      // 2. Check location state
      if (location.state?.doctor) {
        setDoctor(location.state.doctor);
        return;
      }
      
      // 3. Check localStorage
      const savedDoctor = JSON.parse(localStorage.getItem('selectedDoctor'));
      if (savedDoctor) {
        setDoctor(savedDoctor);
        return;
      }
      
      // 4. Default fallback
      setDoctor({
        id: 'default',
        name: 'Dr. Unknown',
        speciality: 'General Physician',
        experience: '5',
        ratings: '4.5',
        consultationFees: '$100'
      });
    };

    getDoctorData();
  }, [propDoctor, location.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const bookingData = {
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpeciality: doctor.speciality,
      doctorExperience: doctor.experience,
      doctorRating: doctor.ratings,
      doctorFees: doctor.consultationFees,
      ...formData,
      bookingDate: new Date().toISOString()
    };
    
    // Save to localStorage
    localStorage.setItem('bookingData', JSON.stringify(bookingData));
    
    // Navigate to booking confirmation
    navigate('/booking-consultation', { state: { booking: bookingData } });
    
    // Call parent onSubmit if provided
    if (onSubmit) onSubmit();
  };

  if (!doctor.name) {
    return <div className="loading">Loading doctor information...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="appointment-form">
      <div className="doctor-header">
        <h3>Book Appointment with Dr. {doctor.name}</h3>
        <p className="speciality">{doctor.speciality}</p>
        <p className="details">
          {doctor.experience} years experience • Rating: {doctor.ratings} • Fee: {doctor.consultationFees}
        </p>
      </div>

      <div className="form-group">
        <label>Your Full Name:</label>
        <input
          type="text"
          name="patientName"
          value={formData.patientName}
          onChange={handleChange}
          required
          placeholder="Enter your name"
        />
      </div>
      
      <div className="form-group">
        <label>Phone Number:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="Enter phone number"
        />
      </div>
      
      <div className="form-group">
        <label>Appointment Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          min={new Date().toISOString().split('T')[0]}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Time Slot:</label>
        <select
          name="timeSlot"
          value={formData.timeSlot}
          onChange={handleChange}
          required
        >
          <option value="">Select a time</option>
          <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
          <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
          <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
          <option value="1:00 PM - 2:00 PM">1:00 PM - 2:00 PM</option>
          <option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</option>
          <option value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</option>
          <option value="4:00 PM - 5:00 PM">4:00 PM - 5:00 PM</option>
        </select>
      </div>
      
      <div className="form-actions">
        <button type="submit" className="book-now-btn">
          Book Now
        </button>
        <button 
          type="button" 
          className="cancel-btn"
          onClick={onCancel || (() => navigate(-1))}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AppointmentFormIC;