import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Restaurant from './components/restaurants/restaurant';
import Menu from './components/menus/menu';
import Navbar from './components/navbar/navbar';
import Order from './components/orders/order'; 
import Home from './components/home/home';

function App() {
  const [restaurants, setRestaurants] = useState([]);

  // Fetch the restaurants from the API
  useEffect(() => {
    fetch('http://localhost:5000/restaurants')
      .then((response) => response.json())
      .then((data) => setRestaurants(data))
      .catch((error) => console.error('Error fetching restaurants:', error));
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Navbar is outside Routes to appear on all pages */}
        <Navbar />

        {/* Routes for the different pages */}
        <Routes>
          
          {/* Route for the home page */}
          <Route path="/" element={<Home />} />

          {/* Route for the restaurant list */}
          <Route
            path="/restaurants"
            element={
              <div className="restaurant-card-container">
                {/* Applied the container class */}
                {restaurants.length > 0 ? (
                  restaurants.map((restaurant) => (
                    <Restaurant key={restaurant._id} restaurant={restaurant} />
                  ))
                ) : (
                  <p>No restaurants available.</p>
                )}
              </div>
            }
          />

          {/* Route for the menu page */}
          <Route path="/menu/restaurant/:id" element={<Menu />} />

          {/* Route for the order page */}
          <Route path="/orders" element={<Order />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
