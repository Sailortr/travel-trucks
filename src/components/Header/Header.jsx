import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="main-header">
      <nav className="navbar">
        <div className="logo">
          <img src="/Logo.svg" alt="TravelTrucks Logo" />
        </div>
        <ul className="nav-links">
          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/catalog">Catalog</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
