import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData) {
      setIsLoggedIn(true);
      setUsername(userData.email.split('@')[0]);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    navigate('/login');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav>
      <div className="nav__logo">
        <Link to="/">
          StayHealthy
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="26"
            width="26"
            viewBox="0 0 1000 1000"
            style={{ fill: '#3685fb' }}
          >
            {/* Your SVG */}
          </svg>
        </Link>
        <span>.</span>
      </div>

      <div className="nav__icon" onClick={toggleMenu}>
        <i className={`fa ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </div>

      <ul className={`nav__links ${isMenuOpen ? 'active' : ''}`}>
        <li className="link">
          <Link to="/">Home</Link>
        </li>
        <li className="link">
          <Link to="/appointments">Appointments</Link>
        </li>
        <li className="link">
          <Link to="/health-blogs">Health Blogs</Link>
        </li>
        <li className="link">
          <Link to="/reviews">Reviews</Link>
        </li>

        {isLoggedIn ? (
          <li className="welcome-user">
            <span>Welcome, {username}</span>
            <ul className="dropdown-menu">
              <li>
                <button onClick={handleLogout} className="btn2">
                  Logout
                </button>
              </li>
            </ul>
          </li>
        ) : (
          <>
            <li className="link">
              <Link to="/signup" className="btn1">Sign Up</Link>
            </li>
            <li className="link">
              <Link to="/login" className="btn1">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;