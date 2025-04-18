import React, { useEffect, useState, useRef, useCallback } from 'react';
import './Notification.css';

const Notification = ({ children }) => {
    const [doctorData, setDoctorData] = useState(null);
    const [appointmentData, setAppointmentData] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef(null);

    const resetTimer = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsVisible(true);
        timeoutRef.current = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => setShowNotification(false), 500);
        }, 15000); // 15 seconds
    }, []);

    const checkAppointment = useCallback(() => {
        const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
        const doctorName = storedDoctorData?.name;
        const storedAppointment = JSON.parse(localStorage.getItem(doctorName));

        if (storedDoctorData && storedAppointment) {
            setDoctorData(storedDoctorData);
            setAppointmentData(storedAppointment);
            setShowNotification(true);
            resetTimer();
        } else {
            setShowNotification(false);
            setIsVisible(false);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        }
    }, [resetTimer]);

    useEffect(() => {
        // Initial check
        checkAppointment();

        // Listen for storage changes (including cancellations)
        const handleStorageChange = () => {
            checkAppointment();
        };
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [checkAppointment]);

    const handleDismiss = useCallback(() => {
        setIsVisible(false);
        setTimeout(() => setShowNotification(false), 500);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }, []);

    if (!showNotification || !appointmentData) {
        return <>{children}</>;
    }

    return (
        <div>
            {children}
            <div className={`notification-container ${isVisible ? 'visible' : 'hidden'}`}>
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