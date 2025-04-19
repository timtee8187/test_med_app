import React, { useState } from 'react';
import './ReviewForm.css';

const ReviewForm = ({ doctor, onReviewSubmit, onClose }) => {
  const [name, setName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    
    if (!reviewText.trim()) {
      setError('Please write your review');
      return;
    }
    
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    // Store patient name in localStorage to prevent multiple reviews
    localStorage.setItem('patientName', name);

    const review = {
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpeciality: doctor.speciality,
      patientName: name,
      review: reviewText,
      rating,
      date: new Date().toISOString()
    };

    onReviewSubmit(review);
    setSubmitted(true);
    setError('');
  };

  if (!doctor) {
    return (
      <div className="review-form-container">
        <h3>No doctor selected</h3>
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="review-success">
        <h3>Thank you for your review!</h3>
        <p>Your feedback has been submitted successfully.</p>
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    );
  }

  return (
    <div className="review-form-container">
      <button onClick={onClose} className="close-button">×</button>
      <h2>Give Your Review</h2>
      <div className="doctor-info">
        <h3>Dr. {doctor.name}</h3>
        <p>Speciality: {doctor.speciality}</p>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Your Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="review">Your Review:</label>
          <textarea
            id="review"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Share your experience..."
            rows="5"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Rating:</label>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= (hoverRating || rating) ? 'filled' : ''}`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                {star <= (hoverRating || rating) ? '★' : '☆'}
              </span>
            ))}
          </div>
        </div>
        
        <button type="submit" className="submit-button">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;