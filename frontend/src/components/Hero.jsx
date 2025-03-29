import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/hero.css";


const HeroSection = () => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate('/workout');
  };
    return (
        <div className="landing-page">
        <section className="hero-section d-flex align-items-center justify-content-center">
          <div className="overlay"></div>
          <div className="container text-center text-light">
            <h1 className="display-3 fw-bold" style={{marginTop:"240px"}}>Welcome to TrackFit!</h1>
            <p className="lead mb-4">
            Track Your Progress, Achieve Your Goals: Fitness at Your Fingertips.
            </p>
            <Link to={"/workout"}></Link><button className="home-button btn btn-primary btn-lg" onClick={handleNavigation}>Get Started Here</button>
          </div>
        </section>
      </div>
    );
  };

export default HeroSection;