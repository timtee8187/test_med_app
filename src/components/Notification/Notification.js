import React, { useEffect, useState, useRef, useCallback } from 'react';
import './Notification.css';

const Notification = ({ children }) => {
    const [doctorData, setDoctorData] = useState(null);
    const [appointmentData, setAppointmentData] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef(null);
    const notificationRef = useRef(null);

    // Reset the visibility timer
    const resetTimer = useCallback(() => {
        clearTimeout(timeoutRef.current);
        setIsVisible(true);
        timeoutRef.current = setTimeout(() => {
            setIsVisible(false);
        }, 15000); // Hide after 15 seconds
    }, []);

    // Check for appointment data in localStorage
    const checkAppointment = useCallback(() => {
        try {
            const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
            const doctorName = storedDoctorData?.name;
            const storedAppointment = JSON.parse(localStorage.getItem(doctorName));

            if (storedDoctorData && storedAppointment) {
                setDoctorData(storedDoctorData);
                setAppointmentData(storedAppointment);
                setShowNotification(true);
                resetTimer();
            } else {
                setIsVisible(false);
                clearTimeout(timeoutRef.current);
            }
        } catch (error) {
            console.error('Error parsing appointment data:', error);
        }
    }, [resetTimer]);

    // Set up storage listener and initial check
    useEffect(() => {
        checkAppointment();
        
        const handleStorageChange = () => {
            checkAppointment();
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearTimeout(timeoutRef.current);
        };
    }, [checkAppointment]);

    // Handle manual dismiss
    const handleDismiss = useCallback(() => {
        setIsVisible(false);
        clearTimeout(timeoutRef.current);
    }, []);

    // Handle animation completion
    useEffect(() => {
        const notification = notificationRef.current;
        if (!notification) return;

        const handleAnimationEnd = (e) => {
            if (e.animationName.includes('slideOut')) {
                setShowNotification(false);
            }
        };

        notification.addEventListener('animationend', handleAnimationEnd);
        return () => {
            notification.removeEventListener('animationend', handleAnimationEnd);
        };
    }, []);

    if (!showNotification) {
        return <>{children}</>;
    }

    return (
        <>
            {children}
            <div 
                ref={notificationRef}
                className={`notification-container ${isVisible ? 'visible' : 'hidden'}`}
                aria-live="polite"
                aria-atomic="true"
            >
                <div className="notification-card">
                    <div className="notification-header">
                        <h3>Appointment Details</h3>
                        <button 
                            className="close-button" 
                            onClick={handleDismiss}
                            aria-label="Close notification"
                        >
                            ×
                        </button>
                    </div>
                    <div className="notification-content">
                        <p><strong>Doctor:</strong> Dr. {doctorData?.name}</p>
                        <p><strong>Speciality:</strong> {doctorData?.speciality}</p>
                        <p><strong>Name:</strong> {appointmentData?.name || 'Not specified'}</p>
                        <p><strong>Phone Number:</strong> {appointmentData?.phoneNumber || 'Not specified'}</p>
                        <p><strong>Date:</strong> {appointmentData?.date || 'Not specified'}</p>
                        <p><strong>Time Slot:</strong> {appointmentData?.time || 'Not specified'}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Notification;