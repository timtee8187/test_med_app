import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";  // Correct path
import './App.css';  // Or the correct CSS path

const LandingPage = () => {
  return (
    <div className="landing-container">
      <Navbar />
      
      <section className="hero-section">
        <div className="hero-content">
          <div data-aos="fade-up" className="flex-hero">
            <h1>
              Your Health
              <br />
              <span className="text-gradient">Our Responsibility</span>
            </h1>
            
            {/* Visual elements */}
            <div className="blob-container">
              <div className="blue blob"></div>
              <div className="blue1 blob"></div>
            </div>
            
            <h4 className="hero-subtitle">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque at
              quae ducimus. Suscipit omnis quibusdam non cum rem voluptatem!
            </h4>
            
            <Link to="/services" className="cta-link">
              <button className="button cta-button">Get Started</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;