import React from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import Navbar from "../Navbar/Navbar";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate(); // Add this hook

  const handleGetStarted = () => {
    // Navigate to login page (you can change to '/signup' if preferred)
    navigate('/login');
  };

  return (
    <div className="landing-container">
      <Navbar />
      
      <section className="hero-section">
        <div>
          <div data-aos="fade-up" className="flex-hero">
            <h1>
              Your Health
              <br />
              <span className="text-gradient">Our Responsibility</span>
            </h1>
            <div className="blob-cont">
              <div className="blue blob"></div>
            </div>
            <div className="blob-cont">
              <div className="blue1 blob"></div>
            </div>
            <h4>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque at
              quae ducimus. Suscipit omnis quibusdam non cum rem voluptatem!
            </h4>
            {/* Updated button with onClick handler */}
            <button className="button" onClick={handleGetStarted}>
              Get Started
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;