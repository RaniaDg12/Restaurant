import React from 'react';
import { useNavigate } from 'react-router-dom';
import './restaurant.css';
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa'; 

function Restaurant({ restaurant }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/menu/restaurant/${restaurant._id}`);
  };

  return (
    <div className="restaurant-card" onClick={handleCardClick}>
      {/* Restaurant image */}
      <img
        src={`/images/${restaurant.image}`}
        alt={restaurant.name}
        className="restaurant-image"
      />

      {/* Restaurant details */}
      <div className="restaurant-name-container">
        <h2 className="restaurant-name">{restaurant.name}</h2>
        <span
          className={`restaurant-status ${restaurant.status === 'Open' ? 'open' : 'closed'}`}
        >
          {restaurant.status}
        </span>
      </div>

      {/* Location */}
      <div className="restaurant-info">
        <FaMapMarkerAlt className="restaurant-icon" />
        <p className="restaurant-location">{restaurant.location}</p>
      </div>

      {/* Operating Hours */}
      <div className="restaurant-info">
        <FaClock className="restaurant-icon" />
        <p className="restaurant-hours">
          {restaurant.openingHour} - {restaurant.closingHour}
        </p>
      </div>
    </div>
  );
}

export default Restaurant;
