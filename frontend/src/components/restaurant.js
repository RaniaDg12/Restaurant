import React from 'react';

function Restaurant({ restaurant }) {
  return (
    <div className="restaurant">
      <h2>{restaurant.name}</h2>
      <p><strong>Location:</strong> {restaurant.location}</p>
      <p><strong>Description:</strong> {restaurant.description}</p>
    </div>
  );
}

export default Restaurant;
