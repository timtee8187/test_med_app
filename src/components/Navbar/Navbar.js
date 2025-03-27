import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Changed from <a> to <Link>
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar-container">
      <div className="nav__logo">
        <Link to="/"> {/* Changed to React Router Link */}
          StayHealthy
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="26"
            width="26"
            viewBox="0 0 1000 1000"
            style={{ fill: '#3685fb' }}
          >
            {/* ... keep your existing SVG ... */}
          </svg>
        </Link>
        <span>.</span>
      </div>

      <div className="nav__icon" onClick={handleClick}>
        <i className={`fa ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </div>

      <ul className={`nav__links ${isMenuOpen ? 'active' : ''}`}>
        <li className="link">
          <Link to="/">Home</Link> {/* Updated to React Router */}
        </li>
        <li className="link">
          <Link to="/appointments">Appointments</Link>
        </li>
        <li className="link">
          <Link to="/health blogs">Health Blogs</Link>
        </li>
        <li className="link">
          <Link to="/reviews">Reviews</Link>
        </li>
        <li className="link">
          <Link to="/signup" className="btn1">Sign Up</Link>
        </li>
        <li className="link">
          <Link to="/login" className="btn1">Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;