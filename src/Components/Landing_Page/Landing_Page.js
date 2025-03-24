import React from "react"; // Importing the necessary modules from React library
import { Link } from "react-router-dom"; // Importing the Link component from react-router-dom library
import "./LandingPage.css"; // Importing the CSS styles for the Landing_Page component

// Defining the Function component Landing_Page
const Landing_Page = () => {
  return (
    <section className="hero-section">
      {" "}
      {/* Creating a section with class name 'hero-section' */}
      <div>
        <div data-aos="fade-up" className="flex-hero">
          {" "}
          {/* Creating a div with data-aos attribute and class name 'flex-hero' */}
          <h1>
            Your Health
            <br />
            <span className="text-gradient">Our Responsibility</span>
          </h1>
          <div className="blob-cont">
            {" "}
            {/* Changed 'class' to 'className' */}
            <div className="blue blob"></div>{" "}
            {/* Changed 'class' to 'className' */}
          </div>
          <div className="blob-cont">
            {" "}
            {/* Changed 'class' to 'className' */}
            <div className="blue1 blob"></div>{" "}
            {/* Changed 'class' to 'className' */}
          </div>
          <h4>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque at
            quae ducimus. Suscipit omnis quibusdam non cum rem voluptatem!
          </h4>
          <Link to="/services">
            {" "}
            {/* Replaced <a> with <Link> for React Router */}
            <button className="button">Get Started</button>{" "}
            {/* Changed 'class' to 'className' */}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Landing_Page; // Exporting the Landing_Page component to be used in other parts of the application