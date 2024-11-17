import React, { useState, useEffect } from 'react';
import Restaurant from './components/restaurants/restaurant';

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
      <header className="app-header">
        <h1>Restaurants</h1>
      </header>
      <main className="restaurant-grid">
        {restaurants.length > 0 ? (
          restaurants.map(restaurant => (
            <Restaurant key={restaurant._id} restaurant={restaurant} />
          ))
        ) : (
          <p>No restaurants available.</p>
        )}
      </main>
    </div>
  );
}

export default App;
