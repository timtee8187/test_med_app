import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import FindDoctorSearchIC from '../FindDoctorSearchIC/FindDoctorSearchIC';
import DoctorCardIC from '../DoctorCardIC/DoctorCardIC';
import './InstantConsultation.css';

const InstantConsultation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDoctors = useCallback(async () => {
    try {
      const response = await fetch('https://api.npoint.io/9a5543d36f1460da2f63');
      if (!response.ok) throw new Error('Failed to fetch doctors');
      
      const data = await response.json();
      return data.map(doctor => ({
        id: doctor.id || Math.random().toString(36).slice(2),
        name: doctor.name || 'Dr. Unknown',
        speciality: doctor.speciality || 'General Physician',
        experience: doctor.experience || '5',
        ratings: doctor.ratings || '4.5',
        profilePic: doctor.profilePic || process.env.PUBLIC_URL + '/images/default-doctor.png',
        consultationFees: doctor.consultationFees || '$100',
        availableSlots: doctor.availableSlots || ['10:00 AM', '02:00 PM', '04:00 PM']
      }));
    } catch (err) {
      throw err;
    }
  }, []);

  const handleSearch = useCallback((searchText) => {
    const speciality = searchParams.get('speciality') || searchText;
    const filtered = doctors.filter(doctor =>
      doctor.speciality.toLowerCase().includes(speciality.toLowerCase()) ||
      doctor.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredDoctors(filtered);
  }, [doctors, searchParams]);

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const fetchedDoctors = await fetchDoctors();
        setDoctors(fetchedDoctors);
        
        const speciality = searchParams.get('speciality');
        if (speciality) {
          handleSearch(speciality);
        } else {
          setFilteredDoctors(fetchedDoctors);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadDoctors();
  }, [searchParams, fetchDoctors, handleSearch]);

  const handleBookAppointment = (bookingData) => {
    // Save booking data to localStorage or state management
    localStorage.setItem('bookingData', JSON.stringify(bookingData));
    
    // Navigate to booking confirmation page
    navigate('/booking-confirmation', { 
      state: { 
        doctor: {
          id: bookingData.doctorId,
          name: bookingData.doctorName,
          speciality: bookingData.doctorSpeciality
        },
        appointmentDetails: bookingData
      }
    });
  };

  if (isLoading) return <div className="loading">Loading doctors...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="consultation-container">
      <FindDoctorSearchIC onSearch={handleSearch} />
      
      <div className="doctors-list">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map(doctor => (
            <DoctorCardIC 
              key={doctor.id} 
              {...doctor}
              onBook={handleBookAppointment}
            />
          ))
        ) : (
          <div className="no-results">
            No doctors found matching your search criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default InstantConsultation;