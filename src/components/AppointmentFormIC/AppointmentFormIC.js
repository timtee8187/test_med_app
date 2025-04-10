import React, { useState } from 'react';
import './AppointmentFormIC.css';

const AppointmentFormIC = ({ doctorName, doctorSpeciality, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        date: '',
        timeSlot: ''
    });
    
    // Available time slots - now actually used in the JSX
    const timeSlots = [
        '9:00 AM - 10:00 AM',
        '10:00 AM - 11:00 AM',
        '11:00 AM - 12:00 PM', 
        '2:00 PM - 3:00 PM',
        '3:00 PM - 4:00 PM',
        '4:00 PM - 5:00 PM'
    ];

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
        if (!formData.date) newErrors.date = 'Date is required';
        if (!formData.timeSlot) newErrors.timeSlot = 'Time slot is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Save to storage
            localStorage.setItem('doctorData', JSON.stringify({
                name: doctorName,
                speciality: doctorSpeciality
            }));
            
            localStorage.setItem(doctorName, JSON.stringify({
                date: formData.date,
                time: formData.timeSlot,
                patient: formData.name
            }));
            
            sessionStorage.setItem('email', formData.name);
            
            onSubmit({
                ...formData,
                doctorName,
                doctorSpeciality
            });
            
            setFormData({
                name: '',
                phoneNumber: '',
                date: '',
                timeSlot: ''
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="appointment-form">
            <h3>Booking with {doctorName}</h3>
            <p>Specialty: {doctorSpeciality}</p>

            <div className="form-group">
                <label htmlFor="name">Full Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={errors.phoneNumber ? 'error' : ''}
                />
                {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="date">Appointment Date:</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className={errors.date ? 'error' : ''}
                />
                {errors.date && <span className="error-message">{errors.date}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="timeSlot">Time Slot:</label>
                <select
                    id="timeSlot"
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleChange}
                    className={errors.timeSlot ? 'error' : ''}
                >
                    <option value="">Select a time slot</option>
                    {timeSlots.map((slot, index) => (
                        <option key={index} value={slot}>{slot}</option>
                    ))}
                </select>
                {errors.timeSlot && <span className="error-message">{errors.timeSlot}</span>}
            </div>

            <div className="form-buttons">
                <button type="submit" className="submit-btn">
                    Book Now
                </button>
                <button 
                    type="button" 
                    className="cancel-btn"
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default AppointmentFormIC;