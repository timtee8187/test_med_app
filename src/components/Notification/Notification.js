import React, { useEffect, useState } from 'react';
import './Notification.css';

const Notification = ({ children }) => {
    const [username, setUsername] = useState("");
    const [doctorData, setDoctorData] = useState(null);
    const [appointmentData, setAppointmentData] = useState(null);
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        const checkAppointment = () => {
            const storedUsername = sessionStorage.getItem('email') || sessionStorage.getItem('patientEmail');
            const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
            const doctorName = storedDoctorData?.name;
            const storedAppointment = JSON.parse(localStorage.getItem(doctorName));

            if (storedUsername && storedDoctorData && storedAppointment) {
                setUsername(storedUsername);
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
                        <p><strong>Doctor:</strong> {doctorData?.name}</p>
                        <p><strong>Specialty:</strong> {doctorData?.speciality}</p>
                        <p><strong>Name:</strong> {username}</p>
                        {appointmentData.patientPhone && (
                            <p><strong>Phone Number:</strong> {appointmentData.patientPhone}</p>
                        )}
                        <p><strong>Date:</strong> {appointmentData.date}</p>
                        <p><strong>Time:</strong> {appointmentData.time}</p>
                    </div>
                    <div className="notification-actions">
                        <button className="dismiss-button" onClick={handleDismiss}>
                            Dismiss
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notification;