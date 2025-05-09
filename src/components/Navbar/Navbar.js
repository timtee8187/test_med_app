import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import AppointmentFormIC from '../AppointmentFormIC/AppointmentFormIC';
import ProfileCard from '../ProfileCard/ProfileCard';
import "./Navbar.css";

const Navbar = () => {
    const [click, setClick] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [showAppointmentForm, setShowAppointmentForm] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [showProfileCard, setShowProfileCard] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const handleClick = () => setClick(!click);

    const handleLogout = () => {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("phone");
        setIsLoggedIn(false);
        setUsername("");
        setShowProfileDropdown(false);
        navigate("/login");
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowProfileDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => { 
        const checkAuthStatus = () => {
            const authToken = sessionStorage.getItem("auth-token");
            const name = sessionStorage.getItem("name");
            const email = sessionStorage.getItem("email");
            
            if (authToken && email) {
                setIsLoggedIn(true);
                setUsername(name || email.split('@')[0]);
            } else {
                setIsLoggedIn(false);
                setUsername("");
            }
        };

        checkAuthStatus();
        window.addEventListener('storage', checkAuthStatus);
        return () => window.removeEventListener('storage', checkAuthStatus);
    }, []);

    return (
        <nav>
            <div className="nav__logo">
                <Link to="/">
                    StayHealthy <i style={{color:'#2190FF'}} className="fa fa-user-md"></i>
                </Link>
                <span>.</span>
            </div>
            <div className="nav__icon" onClick={handleClick}>
                <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
            </div>
            <ul className={click ? 'nav__links active' : 'nav__links'}>
                <li className="link">
                    <Link to="/">Home</Link>
                </li>
                <li className="link">
                    <a 
                        href="#!" 
                        onClick={(e) => {
                            e.preventDefault();
                            setShowAppointmentForm(true);
                        }}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        Appointments
                    </a>
                </li>
                <li className="link">
                    <Link to="/healthblog">Health Blog</Link>
                </li>
                <li className="link">
                    <Link to="/reviews">Reviews</Link>
                </li>
                <li className="link">
                    <Link to="/InstantConsultation">Booking</Link>
                </li>
                {isLoggedIn ? (
                    <li className="link" ref={dropdownRef}>
                        <div className="profile-dropdown-container">
                            <button 
                                className="profile-btn"
                                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                            >
                                Welcome, {username} <i className={`fa fa-chevron-${showProfileDropdown ? 'up' : 'down'}`}></i>
                            </button>
                            {showProfileDropdown && (
                                <div className="profile-dropdown">
                                    <div className="dropdown-actions">
                                        <button 
                                            className="btn2"
                                            onClick={() => {
                                                setShowProfileCard(true);
                                                setShowProfileDropdown(false);
                                            }}
                                        >
                                            Your Profile
                                        </button>
                                        <Link to="/ReportsLayout" onClick={() => setShowProfileDropdown(false)}>
                                            <button className="btn2">Your Reports</button>
                                        </Link>
                                        <button className="btn2 logout-btn" onClick={handleLogout}>
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </li>
                ) : (
                    <>
                        <li className="link">
                            <Link to="/signup">
                                <button className="btn1">Sign Up</button>
                            </Link>
                        </li>
                        <li className="link">
                            <Link to="/login">
                                <button className="btn1">Login</button>
                            </Link>
                        </li>
                    </>
                )}
            </ul>

            {/* Appointment Form Popup */}
            <Popup
                open={showAppointmentForm}
                onClose={() => setShowAppointmentForm(false)}
                modal
                nested
                contentStyle={{
                    width: 'auto',
                    maxWidth: '500px',
                    borderRadius: '5px',
                    padding: '20px',
                    backgroundColor: '#f8f9fa'
                }}
                overlayStyle={{
                    background: 'rgba(0,0,0,0.5)'
                }}
                closeOnDocumentClick={false}
            >
                <div className="modal-content">
                    <h3>Book a General Appointment</h3>
                    <p>Fill out the form below</p>
                    <AppointmentFormIC
                        doctorName="General Practitioner"
                        doctorSpeciality="General Medicine"
                        onSubmit={(data) => {
                            console.log("Appointment booked:", data);
                            setShowAppointmentForm(false);
                        }}
                        onClose={() => setShowAppointmentForm(false)}
                    />
                </div>
            </Popup>

            {/* Profile Card Popup */}
            <Popup
                open={showProfileCard}
                onClose={() => setShowProfileCard(false)}
                modal
                nested
                contentStyle={{
                    width: '90%',
                    maxWidth: '600px',
                    borderRadius: '8px',
                    padding: '0',
                    border: 'none'
                }}
                overlayStyle={{
                    background: 'rgba(0,0,0,0.5)'
                }}
                closeOnDocumentClick={true}
            >
                <div className="profile-card-modal">
                    <button 
                        className="close-btn" 
                        onClick={() => setShowProfileCard(false)}
                    >
                        &times;
                    </button>
                    <ProfileCard />
                </div>
            </Popup>
        </nav>
    );
};

export default Navbar;