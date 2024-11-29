import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; 

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">RESTAURANT APP</Link>

        {/* Links */}
        <ul className="navbar-links">
          <li>
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li>
            <Link to="/restaurants" className="navbar-link">Restaurants</Link>
          </li>
          <li>
            <Link to="/orders" className="navbar-link">My Order</Link>
          </li>
        </ul>

        {/* Buttons for Signup and Login */}
        <div className="navbar-buttons">
          <Link to="/signup" className="navbar-button">Signup</Link>
          <Link to="/login" className="navbar-button">Login</Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="navbar-mobile-icon">
          <i className="fas fa-bars"></i>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
