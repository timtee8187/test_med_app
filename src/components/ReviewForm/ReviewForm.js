import React, { useState } from 'react';
import './ReviewForm.css';

const ReviewForm = ({ doctorName, doctorSpeciality, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 0,
    hoverRating: 0
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleRating = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
    if (errors.rating) setErrors(prev => ({ ...prev, rating: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.review.trim()) newErrors.review = 'Review is required';
    if (formData.rating === 0) newErrors.rating = 'Please select a rating';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSubmit({
      doctorName,
      doctorSpeciality,
      ...formData,
      date: new Date().toLocaleDateString()
    });
  };

  return (
    <div className="review-form-overlay">
      <div className="review-form-container">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Review Dr. {doctorName}</h2>
        <p className="speciality">{doctorSpeciality}</p>
        
        <form onSubmit={handleSubmit}>
          {Object.keys(errors).length > 0 && (
            <div className="error-message">
              Please fill out all required fields
            </div>
          )}

          <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
            <label>Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className={`form-group ${errors.review ? 'has-error' : ''}`}>
            <label>Your Review</label>
            <textarea
              name="review"
              value={formData.review}
              onChange={handleChange}
              placeholder="Share your experience..."
              rows="5"
            />
            {errors.review && <span className="field-error">{errors.review}</span>}
          </div>

          <div className={`form-group ${errors.rating ? 'has-error' : ''}`}>
            <label>Rating</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= (formData.hoverRating || formData.rating) ? 'filled' : ''}`}
                  onClick={() => handleRating(star)}
                  onMouseEnter={() => setFormData(prev => ({ ...prev, hoverRating: star }))}
                  onMouseLeave={() => setFormData(prev => ({ ...prev, hoverRating: 0 }))}
                >
                  ★
                </span>
              ))}
            </div>
            {errors.rating && <span className="field-error">{errors.rating}</span>}
          </div>

          <button type="submit" className="submit-btn">
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;