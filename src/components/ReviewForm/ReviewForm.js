import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ReviewForm.css';

const ReviewForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { doctorId, doctorName, doctorSpeciality } = location.state || {};
  const [formData, setFormData] = useState({
    patientName: '',
    review: '',
    rating: 0
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleRatingClick = (rating) => {
    setFormData({ ...formData, rating });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.patientName || !formData.review || formData.rating === 0) {
      setError('Please fill all fields and provide a rating');
      return;
    }

    const review = {
      doctorId,
      doctorName,
      doctorSpeciality,
      ...formData,
      date: new Date().toISOString(),
      id: Date.now().toString() // Add unique ID for each review
    };

    // Save to localStorage
    const existingReviews = JSON.parse(localStorage.getItem('doctorReviews')) || [];
    localStorage.setItem('doctorReviews', JSON.stringify([...existingReviews, review]));
    
    setSubmitted(true);
    
    // Redirect to reviews page after 2 seconds
    setTimeout(() => {
      navigate('/reviews');
    }, 2000);
  };

  if (!doctorId) {
    return (
      <div className="review-container error-state">
        <h3>No Doctor Selected</h3>
        <p>Please select a doctor from the reviews page to leave a review.</p>
        <button 
          className="back-button"
          onClick={() => navigate('/reviews')}
        >
          Back to Reviews
        </button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="review-container success-state">
        <div className="success-icon">✓</div>
        <h3>Thank You!</h3>
        <p>Your review for Dr. {doctorName} has been submitted.</p>
        <p>Redirecting to reviews page...</p>
      </div>
    );
  }

  return (
    <div className="review-container">
      <div className="review-header">
        <h2>Review for Dr. {doctorName}</h2>
        <p className="speciality">{doctorSpeciality}</p>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="review-form">
        <div className="form-group">
          <label htmlFor="patientName">Your Name:</label>
          <input
            id="patientName"
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="review">Your Review:</label>
          <textarea
            id="review"
            name="review"
            value={formData.review}
            onChange={handleChange}
            placeholder="Share your experience with this doctor..."
            required
            rows="5"
          />
        </div>
        
        <div className="form-group rating-group">
          <label>Rating:</label>
          <div className="rating-container">
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= (hoverRating || formData.rating) ? 'filled' : ''}`}
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="rating-text">
              {formData.rating > 0 ? `${formData.rating} star${formData.rating > 1 ? 's' : ''}` : 'Select rating'}
            </span>
          </div>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Submit Review
          </button>
          <button 
            type="button" 
            className="cancel-btn"
            onClick={() => navigate('/reviews')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;