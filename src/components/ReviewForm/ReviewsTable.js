import React, { useEffect, useState } from 'react';
import ReviewForm from '../ReviewForm/ReviewForm';
import './ReviewsTable.css';

function ReviewsTable() {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('https://api.npoint.io/9a5543d36f1460da2f63');
        if (!response.ok) throw new Error('Failed to fetch doctors');
        
        const data = await response.json();
        
        const processedDoctors = data.map(doctor => ({
          id: doctor.id || Math.random().toString(36).slice(2),
          name: doctor.name || 'Dr. Unknown',
          speciality: doctor.speciality || 'General Physician',
          experience: doctor.experience || 0,
          ratings: Number(doctor.ratings) || 0, // Ensure ratings is a number
          profilePic: doctor.profilePic || '',
          consultationFees: doctor.consultationFees || 'Not specified'
        }));
        
        setDoctors(processedDoctors);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (isLoading) {
    return <div className="loading-message">Loading doctors...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="reviews-table-container">
      <h1>Doctor Reviews</h1>
      <table className="reviews-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Speciality</th>
            <th>Experience</th>
            <th>Current Rating</th>
            <th>Provide Feedback</th>
            <th>Review Given</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, index) => {
            // Safely handle ratings display
            const ratingValue = typeof doctor.ratings === 'number' ? doctor.ratings : 0;
            const displayRating = ratingValue.toFixed ? ratingValue.toFixed(1) : '0.0';
            const starRating = Math.floor(ratingValue);

            return (
              <tr key={doctor.id}>
                <td>{index + 1}</td>
                <td>
                  <div className="doctor-info">
                    {doctor.profilePic && (
                      <img 
                        src={doctor.profilePic} 
                        alt={doctor.name} 
                        className="doctor-avatar"
                      />
                    )}
                    <span>{doctor.name}</span>
                  </div>
                </td>
                <td>{doctor.speciality}</td>
                <td>{doctor.experience} years</td>
                <td>
                  <div className="current-rating">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span 
                        key={i} 
                        className={`star ${i < starRating ? 'filled' : ''}`}
                      >
                        ★
                      </span>
                    ))}
                    <span>({displayRating})</span>
                  </div>
                </td>
                <td>
                  <ReviewForm 
                    doctorName={doctor.name.split('Dr. ')[1] || doctor.name} 
                    doctorSpeciality={doctor.speciality} 
                  />
                </td>
                <td>None yet</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ReviewsTable;