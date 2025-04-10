import React, { useState } from 'react'; // Added useState import here
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCardIC.css';
import AppointmentFormIC from '../AppointmentFormIC/AppointmentFormIC';

const DoctorCardIC = ({ 
    name, 
    speciality, 
    experience, 
    ratings, 
    profilePic,
    consultationFees,
    onReviewClick
}) => {
    const [isBooked, setIsBooked] = useState(false);
    const numericRating = typeof ratings === 'string' ? parseFloat(ratings) : ratings;
    const safeRating = isNaN(numericRating) ? 0 : numericRating;

    const handleBooking = (formData) => {
        localStorage.setItem('doctorData', JSON.stringify({
            name: name,
            speciality: speciality,
            profilePic: profilePic,
            experience: experience,
            ratings: safeRating
        }));
        
        localStorage.setItem(name, JSON.stringify({
            date: formData.date,
            time: formData.timeSlot,
            patientName: formData.name,
            patientPhone: formData.phoneNumber,
            fees: consultationFees
        }));
        
        sessionStorage.setItem('patientEmail', formData.name);
        setIsBooked(true);
    };

    const handleCancel = () => {
        localStorage.removeItem(name);
        localStorage.removeItem('doctorData');
        setIsBooked(false);
    };

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
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
        <div className="doctor-card-container">
            <div className="doctor-card-details-container">
                <div className="doctor-card-profile-image-container">
                    {profilePic ? (
                        <img src={profilePic} alt={name} className="doctor-profile-img" />
                    ) : (
                        <div className="default-profile-img">
                            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="#e0e0e0">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                        </div>
                    )}
                </div>
                
                <div className="doctor-card-details">
                    <div className="doctor-card-detail-name">{name}</div>
                    <div className="doctor-card-detail-speciality">{speciality}</div>
                    <div className="doctor-card-detail-experience">{experience} years experience</div>
                    <div className="doctor-card-detail-consultationfees">
                        Consultation fee: {consultationFees}
                    </div>
                    <div className="doctor-card-detail-ratings">
                        <span className="rating-stars">{renderStars(safeRating)}</span>
                        <span className="rating-value">{safeRating.toFixed(1)}</span>
                    </div>
                </div>
            </div>
            
            <div className="booking-actions">
                {isBooked ? (
                    <button 
                        className="cancel-appointment-btn"
                        onClick={handleCancel}
                    >
                        Cancel Appointment
                        <div className="fee-disclaimer">No cancellation fee</div>
                    </button>
                ) : (
                    <>
                        <Popup
                            trigger={
                                <button className="book-appointment-btn" style={{ backgroundColor: '#1976d2' }}>
                                    Book Appointment
                                    <div className="fee-disclaimer">No booking fee</div>
                                </button>
                            }
                            modal
                            nested
                            contentStyle={{
                                width: 'auto',
                                maxWidth: '500px',
                                borderRadius: '8px',
                                padding: '25px',
                                boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
                            }}
                            overlayStyle={{
                                background: 'rgba(0,0,0,0.5)'
                            }}
                        >
                            {close => (
                                <div className="booking-modal-content">
                                    <button className="modal-close-btn" onClick={close}>×</button>
                                    <h3 className="modal-title">Book Appointment with Dr. {name}</h3>
                                    <p className="modal-speciality">{speciality}</p>
                                    <div className="modal-doctor-info">
                                        {profilePic && <img src={profilePic} alt={name} className="modal-doctor-img" />}
                                        <div>
                                            <p>{experience} years experience</p>
                                            <p>Rating: {safeRating.toFixed(1)}</p>
                                            <p>Fee: {consultationFees}</p>
                                        </div>
                                    </div>
                                    <AppointmentFormIC
                                        doctorName={name}
                                        doctorSpeciality={speciality}
                                        onSubmit={(data) => {
                                            handleBooking(data);
                                            close();
                                        }}
                                        onCancel={close}
                                    />
                                </div>
                            )}
                        </Popup>
                        <button 
                            className="leave-review-btn"
                            onClick={onReviewClick}
                            style={{ marginTop: '10px' }}
                        >
                            Leave Review
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default DoctorCardIC;