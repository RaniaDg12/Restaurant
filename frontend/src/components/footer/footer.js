import React from "react";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Restaurant Management Section */}
        <div className="footer-section">
          <h4 className="footer-title">RestaurantHub</h4>
          <p>
            Streamline restaurant operations and enjoy seamless meal ordering.
            Empowering restaurant owners and food lovers to connect effortlessly.
          </p>
        </div>

        {/* Explore Section */}
        <div className="footer-section">
          <h4 className="footer-title">Explore</h4>
          <ul>
            <li>Top Restaurants</li>
            <li>Popular Meals</li>
            <li>Exclusive Offers</li>
            <li>Customer Favorites</li>
          </ul>
        </div>

        {/* Stay Updated Section */}
        <div className="footer-section">
          <h4 className="footer-title">Stay Updated</h4>
          <p>Subscribe to get updates on offers, new restaurants, and trending dishes.</p>
          <form className="subscribe-form">
            <input
              type="email"
              placeholder="Enter your email"
              className="subscribe-input"
            />
            <button type="submit" className="subscribe-btn">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <ul>
          <li><a href="/about-us">About Us</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/privacy-policy">Privacy Policy</a></li>
          <li><a href="/terms-of-use">Terms of Use</a></li>
        </ul>
        <p>&copy; 2024 RestaurantHub. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
