import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to the Land Registration System</h1>
        <p>Streamlining land ownership using blockchain technology</p>
        <div className="home-buttons">
          <Link to="/login" className="home-button">Sign In</Link>
          <Link to="/signin" className="home-button">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
