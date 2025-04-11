import React, { useState } from 'react';
import './ReviewForm.css';

function ReviewForm({ doctorName, doctorSpeciality }) {
  const [showForm, setShowForm] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 0
  });
  const [hoverRating, setHoverRating] = useState(0);

  const handleButtonClick = () => {
    setShowForm(true);
    setSubmittedMessage('');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingClick = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.name && formData.review && formData.rating > 0) {
      setSubmittedMessage(`Thank you for reviewing Dr. ${doctorName}!`);
      setShowWarning(false);
      // In a real app, you would send this data to your backend
      console.log('Review submitted:', {
        doctor: doctorName,
        ...formData
      });
      setFormData({
        name: '',
        review: '',
        rating: 0
      });
      setTimeout(() => {
        setShowForm(false);
      }, 2000);
    } else {
      setShowWarning(true);
    }
  };

  return (
    <div className="review-container">
      {!showForm ? (
        <button className="feedback-button" onClick={handleButtonClick}>
          Click Here
        </button>
      ) : (
        <form className="review-form" onSubmit={handleSubmit}>
          <h2>Give Your Review</h2>
          <p className="doctor-info">Dr. {doctorName} ({doctorSpeciality})</p>
          
          {showWarning && (
            <p className="warning">Please fill out all fields including the rating.</p>
          )}
          
          <div className="form-group">
            <label htmlFor="name">Your Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
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
              placeholder="Share your experience..."
              required
            />
          </div>
          
          <div className="form-group">
            <label>Rating:</label>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= (hoverRating || formData.rating) ? 'filled' : ''}`}
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  aria-label={`${star} star`}
                >
                  ★
                </span>
              ))}
              <span className="rating-text">
                {formData.rating > 0 ? `${formData.rating} star${formData.rating > 1 ? 's' : ''}` : 'Select rating'}
              </span>
            </div>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="submit-button">Submit Review</button>
            <button 
              type="button" 
              className="cancel-button"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      
      {submittedMessage && (
        <div className="submitted-message">
          <p>{submittedMessage}</p>
        </div>
      )}
    </div>
  );
}

export default ReviewForm;