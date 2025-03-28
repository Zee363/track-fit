import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Header.css";

const Header = () => {
    return (
        <header className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <a className="text-light navbar-brand">TrackFit</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/" className="text-light nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/exercises" className="text-light nav-link">
                  Exercises
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/workout" className="text-light nav-link">
                  Add Workouts
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
    )
}

export default Header;