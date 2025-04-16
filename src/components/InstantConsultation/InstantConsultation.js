import React, { useEffect, useState, useCallback } from 'react';
import './InstantConsultation.css';
import { useSearchParams } from 'react-router-dom';
import FindDoctorSearchIC from '../FindDoctorSearchIC/FindDoctorSearchIC';
import DoctorCardIC from '../DoctorCardIC/DoctorCardIC';

const InstantConsultation = ({ onAppointmentChange }) => {
  const [searchParams] = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const getDoctorsDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://api.npoint.io/9a5543d36f1460da2f63');
      
      if (!response.ok) {
        throw new Error('Failed to fetch doctors data');
      }
      
      const data = await response.json();
      setDoctors(data);
      
      if (searchParams.get('speciality')) {
        const filtered = data.filter(doctor => 
          doctor.speciality.toLowerCase() === searchParams.get('speciality').toLowerCase()
        );
        setFilteredDoctors(filtered);
        setIsSearched(true);
      } else {
        setFilteredDoctors(data);
        setIsSearched(true);
      }
    } catch (err) {
      console.error('Error fetching doctors:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  const handleSearch = (searchText) => {
    if (searchText === '') {
      setFilteredDoctors(doctors);
      setIsSearched(true);
    } else {
      const filtered = doctors.filter(doctor =>
        doctor.speciality.toLowerCase().includes(searchText.toLowerCase()) ||
        doctor.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredDoctors(filtered);
      setIsSearched(true);
    }
  };

  useEffect(() => {
    getDoctorsDetails();
  }, [getDoctorsDetails]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading doctors...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error loading doctors: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="searchpage-container">
      <FindDoctorSearchIC onSearch={handleSearch} />
      <div className="search-results-container">
        {isSearched ? (
          <>
            <h2>{filteredDoctors.length} doctors available</h2>
            <h3>Book appointments with minimum wait-time & verified doctor details</h3>
            {filteredDoctors.length > 0 ? (
              <div className="doctors-grid">
                {filteredDoctors.map(doctor => (
                  <DoctorCardIC 
                    key={`${doctor.name}-${doctor.experience}`}
                    name={doctor.name}
                    speciality={doctor.speciality}
                    experience={doctor.experience}
                    ratings={doctor.ratings}
                    onAppointmentChange={onAppointmentChange}
                  />
                ))}
              </div>
            ) : (
              <p className="no-doctors">No doctors found matching your search.</p>
            )}
          </>
        ) : (
          <div className="welcome-message">
            <h2>Find the right doctor for you</h2>
            <p>Search by name or specialty to see available doctors</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstantConsultation;