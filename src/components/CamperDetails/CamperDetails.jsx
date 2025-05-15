import React from "react";
import "./CamperDetails.css";

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

const CamperDetails = ({ camper }) => {
  const { form, length, width, height, tank, consumption } = camper;

  return (
    <section className="camper-details">
      <div className="features-box">
        <div className="features-row">
          {Object.entries(featureIcons).map(([key, { label, icon }]) => {
            const value = camper[key] ?? camper.details?.[key];
            if (value) {
              return (
                <span className="feature-tag" key={key}>
                  <img src={icon} alt={label} className="feature-icon" />
                  {label}
                </span>
              );
            }
            return null;
          })}
        </div>

        <div className="vehicle-details">
          <h4>Vehicle details</h4>
          <hr />
          <ul>
            <li>
              <span>Form</span>
              <span>{form}</span>
            </li>
            <li>
              <span>Length</span>
              <span>{length}</span>
            </li>
            <li>
              <span>Width</span>
              <span>{width}</span>
            </li>
            <li>
              <span>Height</span>
              <span>{height}</span>
            </li>
            <li>
              <span>Tank</span>
              <span>{tank}</span>
            </li>
            <li>
              <span>Consumption</span>
              <span>{consumption}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CamperDetails;
