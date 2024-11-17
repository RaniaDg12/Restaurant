import React from 'react';
import './restaurant.css'; 

function Restaurant({ restaurant }) {
  return (
    <div className="restaurant-card">
      <h2 className="restaurant-name">{restaurant.name}</h2>
      <p className="restaurant-location"><strong>Location:</strong> {restaurant.location}</p>
      <p className="restaurant-description"><strong>Description:</strong> {restaurant.description}</p>
    </div>
  );
}

export default Restaurant;
