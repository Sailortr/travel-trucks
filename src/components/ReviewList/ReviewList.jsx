import React from "react";
import "./ReviewList.css";

const ReviewList = ({ reviews }) => {
  const getInitial = (name) => {
    if (!name || typeof name !== "string") return "?";
    return name.charAt(0).toUpperCase();
  };

  const renderStars = (rating) => {
    const totalStars = 5;
    const stars = [];
    for (let i = 1; i <= totalStars; i++) {
      stars.push(
        <img
          key={i}
          src={i <= rating ? "/Star-plus.svg" : "/Star-none.svg"}
          alt="star"
          className="star-icon"
        />
      );
    }
    return stars;
  };

  return (
    <section className="reviews">
      {reviews?.length > 0 ? (
        reviews.map((rev, idx) => (
          <div key={idx} className="review">
            <div className="review-avatar">{getInitial(rev.reviewer_name)}</div>
            <div className="review-content">
              <div className="review-author">
                <strong>{rev.reviewer_name || "Anonymous"}</strong>
              </div>
              <div className="review-stars">
                {renderStars(rev.reviewer_rating)}
              </div>
              <p className="review-text">{rev.comment}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </section>
  );
};

export default ReviewList;
