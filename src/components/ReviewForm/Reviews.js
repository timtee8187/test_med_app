import React, { useEffect, useState } from 'react';
import './Reviews.css';
import ReviewForm from './ReviewForm';

const Reviews = () => {
  const [doctors, setDoctors] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch doctors data from API
        const response = await fetch('https://api.npoint.io/9a5543d36f1460da2f63');
        if (!response.ok) throw new Error('Failed to fetch doctors');
        
        const doctorsData = await response.json();
        const processedDoctors = doctorsData.map((doctor, index) => ({
          id: doctor.id || `doc-${index}`,
          name: doctor.name || 'Dr. Unknown',
          speciality: doctor.speciality || 'General Physician',
          profilePic: doctor.profilePic || '',
          ratings: doctor.ratings || 0
        }));

        // Get reviews from localStorage
        const storedReviews = JSON.parse(localStorage.getItem('doctorReviews')) || [];
        
        setDoctors(processedDoctors);
        setReviews(storedReviews);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getDoctorReviews = (doctorId) => {
    return reviews.filter(review => review.doctorId === doctorId);
  };

  const handleLeaveReview = (doctor) => {
    setSelectedDoctor({
      id: doctor.id,
      name: doctor.name,
      speciality: doctor.speciality
    });
    setShowReviewForm(true);
  };

  const handleReviewSubmit = (review) => {
    const existingReviews = JSON.parse(localStorage.getItem('doctorReviews')) || [];
    const updatedReviews = [...existingReviews, review];
    
    localStorage.setItem('doctorReviews', JSON.stringify(updatedReviews));
    setReviews(updatedReviews);
    setShowReviewForm(false);
  };

  const handleCloseForm = () => {
    setShowReviewForm(false);
  };

  if (loading) {
    return (
      <div className="reviews-loading">
        <div className="spinner"></div>
        <p>Loading doctors...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="reviews-error">
        <p>Error loading doctors: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="reviews-page">
      <header className="reviews-header">
        <h1>Doctor Reviews</h1>
        <div className="reviews-stats">
          <span>Doctors: {doctors.length}</span> | 
          <span> Reviews: {reviews.length}</span>
        </div>
      </header>

      <table className="reviews-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Specialty</th>
            <th>Provide Feedback</th>
            <th>Review Given</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, index) => {
            const doctorReviews = getDoctorReviews(doctor.id);
            const reviewCount = doctorReviews.length;
            const avgRating = reviewCount > 0 
              ? (doctorReviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount).toFixed(1)
              : null;

            return (
              <tr key={doctor.id} className="doctor-review-row">
                <td>{index + 1}</td>
                <td>
                  <div className="doctor-profile">
                    {doctor.profilePic ? (
                      <img src={doctor.profilePic} alt={doctor.name} className="doctor-photo" />
                    ) : (
                      <div className="doctor-avatar">{doctor.name.charAt(0)}</div>
                    )}
                    <div className="doctor-info">
                      <h3>{doctor.name}</h3>
                    </div>
                  </div>
                </td>
                <td className="speciality">{doctor.speciality}</td>
                <td>
                  <button 
                    onClick={() => handleLeaveReview(doctor)}
                    className="feedback-button"
                    disabled={doctorReviews.some(r => r.patientName === localStorage.getItem('patientName'))}
                  >
                    {doctorReviews.some(r => r.patientName === localStorage.getItem('patientName')) 
                      ? 'Reviewed' 
                      : 'Click Here'}
                  </button>
                </td>
                <td>
                  <div className="rating-display">
                    {avgRating ? (
                      <>
                        <div className="stars">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span 
                              key={star} 
                              className={star <= Math.round(avgRating) ? 'filled' : ''}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="average-rating">{avgRating} ({reviewCount})</span>
                      </>
                    ) : (
                      <span className="no-reviews">No reviews yet</span>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {showReviewForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <ReviewForm
              doctor={selectedDoctor}
              onReviewSubmit={handleReviewSubmit}
              onClose={handleCloseForm}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;