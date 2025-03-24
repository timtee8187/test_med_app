// Import necessary modules from React library
import React from 'react';

// Import components for routing from react-router-dom library
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import custom Navbar component
import Navbar from './Components/Navbar/Navbar';

// Import LandingPage1 component
import LandingPage1 from './components/LandingPage1/LandingPage1';

// Function component for the main App
function App() {
  // Render the main App component
  return (
    <div className="App">
      {/* Set up BrowserRouter for routing */}
      <BrowserRouter>
        {/* Display the Navbar component */}
        <Navbar />

        {/* Set up the Routes for different pages */}
        <Routes>
          {/* Define individual Route components for different pages */}
          <Route path="/" element={<LandingPage1 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Export the App component as the default export
export default App;