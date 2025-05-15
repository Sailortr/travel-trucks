import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCamperById } from "../api/campersAPI";
import CamperDetails from "../components/CamperDetails/CamperDetails";
import ReviewList from "../components/ReviewList/ReviewList";
import ReservationForm from "../components/ReservationForm/ReservationForm";
import "./CamperPage.css";

const CamperPage = () => {
  const { id } = useParams();
  const [camper, setCamper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("features");

  useEffect(() => {
    getCamperById(id).then((data) => {
      setCamper(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!camper) return <p>Not found</p>;

  return (
    <div className="camper-page">
      <h2 className="camper-title">{camper.name}</h2>

      <div className="camper-meta">
        <span className="rating">
          ⭐ {camper.rating} (
          <a href="#reviews">{camper.reviews?.length} Reviews</a>)
        </span>
        <span className="location">📍 {camper.location}</span>
      </div>

      <h3 className="camper-price">€{parseFloat(camper.price).toFixed(2)}</h3>

      <div className="gallery">
        {camper.gallery?.map((img, idx) => (
          <img key={idx} src={img.thumb} alt={`Gallery ${idx}`} />
        ))}
      </div>

      <p className="description">{camper.description}</p>

      <div className="tabs">
        <button
          className={activeTab === "features" ? "active" : ""}
          onClick={() => setActiveTab("features")}
        >
          Features
        </button>
        <button
          className={activeTab === "reviews" ? "active" : ""}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      <div className="tab-section">
        {activeTab === "features" && (
          <div className="details-and-form">
            <CamperDetails camper={camper} />
            <ReservationForm />
          </div>
        )}
        {activeTab === "reviews" && (
          <div className="details-and-form" id="reviews">
            <ReviewList reviews={camper.reviews} />
            <ReservationForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default CamperPage;
