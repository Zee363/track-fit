import React from "react";
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/hero.css";

const HeroSection = () => {
    return (
        <div className="landing-page">
        <header className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <a className="text-light navbar-brand" href="#">
              TrackFit
            </a>
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
                    <Link to={"/home"}>
                  <a className="text-light nav-link">
                    Home
                  </a>
                  </Link>
                </li>
                <li className="nav-item">
                <Link to="/workout">
                  <a className="text-light nav-link">
                    Workouts
                  </a>
                  </Link>
                </li>
                <li className="nav-item">
                <Link to="/add">
                  <a className="text-light nav-link">
                    Add Exercise
                  </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </header>
  
        <section className="hero-section d-flex align-items-center justify-content-center">
          <div className="overlay"></div>
          <div className="container text-center text-light">
            <h1 className="display-3 fw-bold">Welcome to TrackFit!</h1>
            <p className="lead mb-4">
            Track Your Progress, Achieve Your Goals: Fitness at Your Fingertips.
            </p>
            <button className="home-button btn btn-primary btn-lg">Get Started</button>
          </div>
        </section>
      </div>
    );
  };

export default HeroSection;