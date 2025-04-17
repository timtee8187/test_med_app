import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ReviewForm.css';

const ReviewForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { doctorId, doctorName } = location.state || {};
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !review) return;

    const newReview = {
      doctorId,
      doctorName,
      patientName: name,
      review,
      rating,
      date: new Date().toISOString(),
      id: Date.now().toString()
    };

    const existingReviews = JSON.parse(localStorage.getItem('doctorReviews')) || [];
    localStorage.setItem('doctorReviews', JSON.stringify([...existingReviews, newReview]));

    setSubmitted(true);
    setTimeout(() => navigate('/reviews'), 2000);
  };

  if (!doctorId) {
    return (
      <div className="review-form-wrapper">
        <h3>Please select a doctor first</h3>
        <button onClick={() => navigate('/reviews')}>Back</button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="review-form-wrapper">
        <h3>Thank you for your review!</h3>
      </div>
    );
  }

  return (
    <div className="review-form-container">
      <h1 className="review-heading">Give Your Review</h1>
      <div className="review-form-wrapper">
        <form onSubmit={handleSubmit} className="review-form">
          <div className="form-field">
            <label><strong>Name:</strong></label>
            <div className="input-line"></div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label><strong>Review:</strong></label>
            <div className="input-line"></div>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
              rows="4"
            />
          </div>

          <div className="form-field">
            <label><strong>Rating:</strong></label>
            <div className="input-line"></div>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= (hoverRating || rating) ? 'filled' : ''}`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  ☆
                </span>
              ))}
            </div>
          </div>

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;