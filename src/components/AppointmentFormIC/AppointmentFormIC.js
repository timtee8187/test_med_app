import React, { useState } from 'react';
import './AppointmentFormIC.css';

const AppointmentFormIC = ({ onSubmit, onCancel }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !phoneNumber) {
            alert('Please fill in all required fields');
            return;
        }
        
        const appointmentData = {
            name,
            phoneNumber,
            date: date || new Date().toLocaleDateString(),
            time: time || new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        };
        
        onSubmit(appointmentData);
    };

    return (
        <form onSubmit={handleSubmit} className="appointment-form">
            <h3>Patient Information</h3>
            
            <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Enter your full name"
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number *</label>
                <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    placeholder="Enter your phone number"
                />
            </div>
            
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="date">Preferred Date</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="time">Preferred Time</label>
                    <input
                        type="time"
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                </div>
            </div>
            
            <div className="form-actions">
                <button type="submit" className="book-btn">
                    Book Appointment
                </button>
                <button type="button" onClick={onCancel} className="cancel-btn">
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default AppointmentFormIC;