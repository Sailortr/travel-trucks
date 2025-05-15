import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../redux/favoritesSlice";
import { useNavigate } from "react-router-dom";
import "./CamperCard.css";

const featureIcons = {
  transmission: { icon: "/Automatic-icon.svg" },
  ac: { icon: "/AC-icon.svg" },
  engine: { icon: "/Petrol-icon.svg" },
  kitchen: { icon: "/Kitchen-icon.svg" },
  radio: { icon: "/Radio-icon.svg" },
  bathroom: { icon: "/Bathroom-icon.svg" },
  refrigerator: { icon: "/Refrigerator-icon.svg" },
  microwave: { icon: "/Microwave-icon.svg" },
  gas: { icon: "/Gas-icon.svg" },
  water: { icon: "/Water-icon.svg" },
};

const CamperCard = ({ camper }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector((state) => state.favorites.favorites);
  const isFavorite = favorites.includes(camper.id);

  const handleFavorite = () => {
    dispatch(toggleFavorite(camper.id));
  };

  const handleShowMore = () => {
    navigate(`/catalog/${camper.id}`);
  };

  return (
    <div className="camper-card">
      <div className="image-wrapper">
        <img
          src={camper.gallery?.[0]?.thumb}
          alt={camper.name}
          className="camper-img"
        />
      </div>

      <div className="camper-info">
        <div className="top-row">
          <h3>{camper.name}</h3>
          <div className="price-favorite">
            <span className="price">
              €{parseFloat(camper.price).toFixed(2)}
            </span>
            <button className="favorite-btn" onClick={handleFavorite}>
              <img
                src={isFavorite ? "/kalp=pressed.svg" : "/kalp=Default.svg"}
                alt="favorite"
                className="kalp-icon"
              />
            </button>
          </div>
        </div>

        <div className="meta">
          <span className="rating">
            ⭐ {camper.rating} ({camper.reviews?.length || 0} Reviews)
          </span>
          <span className="location">📍 {camper.location}</span>
        </div>

        <p className="description">{camper.description?.slice(0, 100)}...</p>

        <div className="features">
          {Object.entries(featureIcons).map(([key, { label, icon }]) => {
            const value = camper[key] ?? camper.details?.[key];
            if (typeof value === "boolean" && !value) return null;
            if (key === "engine" && !camper.engine) return null;
            if (key === "transmission" && !camper.transmission) return null;

            return (
              <span className="feature" key={key}>
                <img src={icon} alt={label} className="feature-icon" />
                {label}
              </span>
            );
          })}
        </div>

        <button className="show-more" onClick={handleShowMore}>
          Show more
        </button>
      </div>
    </div>
  );
};

export default CamperCard;
