import React, { useState } from 'react';
import './ReviewForm.css';

const ReviewForm = ({ doctorName, doctorSpeciality, onReviewSubmit, onClose }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating > 0) {
      onReviewSubmit({
        doctorName,
        doctorSpeciality,
        rating,
        review: reviewText,
        date: new Date().toLocaleDateString()
      });
    }
  };

  return (
    <div className="review-form-container">
      <button className="close-btn" onClick={onClose}>×</button>
      <h3>Review Dr. {doctorName}</h3>
      <p className="speciality">{doctorSpeciality}</p>
      
      <form onSubmit={handleSubmit}>
        <div className="rating-section">
          <label>Rating:</label>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= rating ? 'filled' : ''}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        
        <div className="review-section">
          <label>Your Review:</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Share your experience..."
          />
        </div>
        
        <button type="submit" className="submit-btn">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;