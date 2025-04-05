import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import AppointmentFormIC from '../AppointmentFormIC/AppointmentFormIC'; // Adjust path as needed
import "./Navbar.css";

const Navbar = () => {
    const [click, setClick] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [showAppointmentForm, setShowAppointmentForm] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => setClick(!click);

    const handleLogout = () => {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("email");
        setIsLoggedIn(false);
        setUsername("");
        navigate("/login");
    };

    useEffect(() => { 
        const checkAuthStatus = () => {
            const authToken = sessionStorage.getItem("auth-token");
            const email = sessionStorage.getItem("email");
            
            if (authToken && email) {
                setIsLoggedIn(true);
                setUsername(email.split('@')[0]);
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
                    {/* Modified Appointments link (looks identical but opens popup) */}
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
                    <>
                        <li className="link">
                            <span style={{ marginRight: "10px" }}>Welcome, {username}</span>
                            <button className="btn2" onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    </>
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

            {/* Hidden Appointment Form Popup */}
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
        </nav>
    );
};

export default Navbar;