import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Restaurant from './components/restaurants/restaurant';
import Menu from './components/menus/menu'; 
import Navbar from './components/navbar/navbar'; 
import './App.css'; // Make sure this imports your global styles if needed

function App() {
  const [restaurants, setRestaurants] = useState([]);

  // Fetch the restaurants from the API
  useEffect(() => {
    fetch('http://localhost:5000/restaurants')
      .then(response => response.json())
      .then(data => setRestaurants(data))
      .catch(error => console.error('Error fetching restaurants:', error));
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Navbar is outside Routes to appear on all pages */}
        <Navbar />

        {/* Routes for the different pages */}
        <Routes>
          {/* Route for the restaurant list */}
          <Route
            path="/"
            element={
              <div className="restaurant-card-container"> {/* Applied the container class */}
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
