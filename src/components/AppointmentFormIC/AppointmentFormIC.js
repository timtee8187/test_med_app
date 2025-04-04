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
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
        else if (!/^\d{10,15}$/.test(formData.phoneNumber)) newErrors.phoneNumber = 'Enter valid phone number';
        if (!formData.date) newErrors.date = 'Date is required';
        if (!formData.timeSlot) newErrors.timeSlot = 'Time slot is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        try {
            await onSubmit({
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
        } catch (error) {
            console.error('Submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="appointment-form">
            <div className="doctor-info">
                <h3>{doctorName}</h3>
                <p>{doctorSpeciality}</p>
                <p>Ratings: ☆☆☆☆</p>
            </div>

            <div className="form-group">
                <label htmlFor="name">Name:</label>
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
                <label htmlFor="date">Date of Appointment:</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    max={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                    className={errors.date ? 'error' : ''}
                />
                {errors.date && <span className="error-message">{errors.date}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="timeSlot">Book Time Slot:</label>
                <select
                    id="timeSlot"
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleChange}
                    className={errors.timeSlot ? 'error' : ''}
                >
                    <option value="">Select a time slot ▼</option>
                    {timeSlots.map((slot, index) => (
                        <option key={index} value={slot}>{slot}</option>
                    ))}
                </select>
                {errors.timeSlot && <span className="error-message">{errors.timeSlot}</span>}
            </div>

            <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Booking...' : 'Book Now'}
            </button>
        </form>
    );
};

export default AppointmentFormIC;