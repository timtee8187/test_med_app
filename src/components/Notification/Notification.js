import React, { useEffect, useState } from 'react';
import './Notification.css';

const Notification = ({ children }) => {
    const [doctorData, setDoctorData] = useState(null);
    const [appointmentData, setAppointmentData] = useState(null);
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        const checkAppointment = () => {
            const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
            const doctorName = storedDoctorData?.name;
            const storedAppointment = JSON.parse(localStorage.getItem(doctorName));

            if (storedDoctorData && storedAppointment) {
                setDoctorData(storedDoctorData);
                setAppointmentData(storedAppointment);
                setShowNotification(true);
            } else {
                setShowNotification(false);
            }
        };

        // Initial check
        checkAppointment();

        // Listen for storage changes
        const handleStorageChange = () => checkAppointment();
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleDismiss = () => {
        setShowNotification(false);
    };

    if (!showNotification || !appointmentData) {
        return <>{children}</>;
    }

    return (
        <div>
            {children}
            <div className="notification-container">
                <div className="notification-card">
                    <div className="notification-header">
                        <h3>Appointment Details</h3>
                        <button className="close-button" onClick={handleDismiss}>×</button>
                    </div>
                    <div className="notification-content">
                        <p><strong>Doctor:</strong> Dr. {doctorData?.name}</p>
                        <p><strong>Speciality:</strong> {doctorData?.speciality}</p>
                        <p><strong>Name:</strong> {appointmentData.name || 'Not specified'}</p>
                        <p><strong>Phone Number:</strong> {appointmentData.phoneNumber || 'Not specified'}</p>
                        <p><strong>Date of Appointment:</strong> {appointmentData.date || 'Not specified'}</p>
                        <p><strong>Time Slot:</strong> {appointmentData.time || 'Not specified'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notification;