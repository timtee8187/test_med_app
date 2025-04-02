import React, { useState } from 'react';
import './AppointmentFormIC.css';

const AppointmentFormIC = ({ doctorName, doctorSpeciality, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        date: '',
        timeSlot: ''
    });
    const [errors, setErrors] = useState({});

    // Available time slots
    const timeSlots = [
        '9:00 AM - 10:00 AM',
        '10:00 AM - 11:00 AM',
        '11:00 AM - 12:00 PM', 
        '2:00 PM - 3:00 PM',
        '3:00 PM - 4:00 PM',
        '4:00 PM - 5:00 PM'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
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
            onSubmit({
                ...formData,
                doctorName,
                doctorSpeciality
            });
            // Reset form
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

            <button type="submit" className="submit-btn">
                Confirm Appointment
            </button>
        </form>
    );
};

export default AppointmentFormIC;