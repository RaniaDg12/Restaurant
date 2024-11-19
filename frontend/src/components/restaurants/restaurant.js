import React from 'react';
import { useNavigate } from 'react-router-dom';
import './restaurant.css';

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
      <h2 className="restaurant-name">{restaurant.name}</h2>
      <p className="restaurant-location"><strong>Location:</strong> {restaurant.location}</p>
      <p className="restaurant-description"><strong>Description:</strong> {restaurant.description}</p>
    </div>
  );
}

export default Restaurant;
