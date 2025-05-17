import React, { useState } from "react";
import "./Filters.css";

const Filters = ({ onSearch }) => {
  const [location, setLocation] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [features, setFeatures] = useState([]);

  const toggleFeature = (feature) => {
    setFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  const handleSearch = () => {
    if (typeof onSearch === "function") {
      onSearch({ location, type: vehicleType, features });
    } else {
      console.warn("onSearch fonksiyonu tanımlı değil!");
    }
  };

  return (
    <aside className="filter-panel">
      <div className="location-filter">
        <label>Location</label>
        <input
          type="text"
          placeholder="Kyiv, Ukraine"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="filter-group">
        <label>Filters</label>
        <h4>Vehicle equipment</h4>
        <div className="equipment-buttons">
          {[
            { key: "AC", icon: "/AC.svg" },
            { key: "transmission", icon: "/Automatic.svg" },
            { key: "kitchen", icon: "/Kitchen.svg" },
            { key: "TV", icon: "/TV.svg" },
            { key: "bathroom", icon: "/Bathroom.svg" },
          ].map(({ key, icon }) => (
            <button
              key={key}
              onClick={() => toggleFeature(key)}
              className={`equipment-icon-wrapper ${
                features.includes(key) ? "active" : ""
              }`}
            >
              <img src={icon} className="equipment-icon" />
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h4>Vehicle type</h4>
        <div className="type-buttons">
          {[
            { key: "panelTruck", icon: "/Van.svg" },
            { key: "fullyIntegrated", icon: "/Fully.svg" },
            { key: "alcove", icon: "/Alcove.svg" },
          ].map(({ key, icon }) => (
            <button
              key={key}
              onClick={() => setVehicleType(key)}
              className={`type-icon-wrapper ${
                vehicleType === key ? "active" : ""
              }`}
            >
              <img src={icon} className="type-icon" />
            </button>
          ))}
        </div>
      </div>
      <button className="search-btn" onClick={handleSearch}>
        Search
      </button>
    </aside>
  );
};

export default Filters;
