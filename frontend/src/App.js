import React, { useState, useEffect } from 'react';
import Restaurant from './components/restaurant';

function App() {
  const [restaurants, setRestaurants] = useState([]);

  // Charger les restaurants depuis l'API (GET)
  useEffect(() => {
    fetch('http://localhost:5000/restaurants')
      .then(response => response.json())
      .then(data => setRestaurants(data))
      .catch(error => console.error('Error fetching restaurants:', error));
  }, []);

  return (
    <div className="App">
      <h1>Restaurants</h1>
      <div>
        {restaurants.length > 0 ? (
          restaurants.map(restaurant => (
            <Restaurant key={restaurant._id} restaurant={restaurant} />
          ))
        ) : (
          <p>No restaurants available.</p>
        )}
      </div>
    </div>
  );
}

export default App;
