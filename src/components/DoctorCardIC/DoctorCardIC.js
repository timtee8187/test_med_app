import React, { useState } from 'react';
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
    consultationFees 
}) => {
    const [isBooked, setIsBooked] = useState(false);
    // Removed unused showModal state since we're using Popup's built-in open state

    const handleBooking = (formData) => {
        console.log('Booking confirmed:', { doctor: name, ...formData });
        setIsBooked(true);
    };

    const handleCancel = () => {
        setIsBooked(false);
    };

    return (
        <div className="doctor-card-container">
            <div className="doctor-card-details-container">
                <div className="doctor-card-profile-image-container">
                    {profilePic ? (
                        <img src={profilePic} alt={name} />
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="#e0e0e0">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                    )}
                </div>
                
                <div className="doctor-card-details">
                    <div className="doctor-card-detail-name">{name}</div>
                    <div className="doctor-card-detail-speciality">{speciality}</div>
                    <div className="doctor-card-detail-experience">{experience} years experience</div>
                    <div className="doctor-card-detail-consultationfees">
                        Consultation: {consultationFees}
                    </div>
                    <div className="ratings">Rating: {ratings}</div>
                </div>
            </div>
            
            <div className="booking-actions">
                {isBooked ? (
                    <button 
                        className="cancel-appointment-btn"
                        onClick={handleCancel}
                    >
                        Cancel Appointment
                        <div>No Cancellation Fee</div>
                    </button>
                ) : (
                    <Popup
                        trigger={
                            <button className="book-appoinment-btn">
                                Book Appointment
                                <div>No Booking Fee</div>
                            </button>
                        }
                        modal
                        nested
                        contentStyle={{
                            width: 'auto',
                            maxWidth: '500px',
                            borderRadius: '5px',
                            padding: '20px'
                        }}
                        overlayStyle={{
                            background: 'rgba(0,0,0,0.5)'
                        }}
                    >
                        {close => (
                            <div className="modal-content">
                                <h3>Book Appointment with {name}</h3>
                                <p>{speciality}</p>
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
                )}
            </div>
        </div>
    );
};

export default DoctorCardIC;