import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="overlay">
        <div className="hero-content">
          <h1>Campers of your dreams</h1>
          <p>You can find everything you want in our catalog</p>
          <button onClick={() => navigate("/catalog")}>View Now</button>
        </div>
      </div>
    </section>
  );
};

export default Home;
