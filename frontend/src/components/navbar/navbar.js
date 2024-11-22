import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; // Assuming you create this CSS file

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="navbar-brand">RESTAURANT APP</span>
        </Link>

        {/* Links */}
        <ul className="navbar-links">
          <li>
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li>
            <Link to="/orders" className="navbar-link">My Order</Link>
          </li>
          <li>
            <Link to="/aboutus" className="navbar-link">About Us</Link>
          </li>
        </ul>

        {/* Mobile Menu Icon */}
        <div className="navbar-mobile-icon">
          <i className="fas fa-bars"></i>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
