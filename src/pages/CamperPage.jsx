import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CamperDetails from "../components/CamperDetails/CamperDetails";
import ReviewList from "../components/ReviewList/ReviewList";
import ReservationForm from "../components/ReservationForm/ReservationForm";
import { getCamperById } from "../redux/campersSlice";
import "./CamperPage.css";

const CamperPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const camper = useSelector((state) => state.campers.camperDetails[id]);
  const [activeTab, setActiveTab] = React.useState("features");

  useEffect(() => {
    if (!camper) {
      dispatch(getCamperById(id));
    }
  }, [dispatch, id, camper]);

  if (!camper) return <p>Loading camper...</p>;

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

      <div
        className="details-and-form"
        id={activeTab === "reviews" ? "reviews" : undefined}
      >
        {activeTab === "features" && <CamperDetails camper={camper} />}
        {activeTab === "reviews" && <ReviewList reviews={camper.reviews} />}
        <ReservationForm />
      </div>
    </div>
  );
};

export default CamperPage;
