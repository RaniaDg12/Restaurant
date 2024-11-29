import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import "./home.css";
import Footer from "../footer/footer";

function Home() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);

  // Fetch popular restaurants from the database
  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const response = await fetch("http://localhost:5000/restaurants"); 
        const data = await response.json();
        setRestaurants(data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    }
    fetchRestaurants();
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            MANAGE RESTAURANTS, ORDER MEALS, AND ENJOY DELICIOUS MENUS
          </h1>
          <p className="hero-subtitle">
            Explore a world of culinary delights with seamless management and
            ordering features.
          </p>
          <div className="hero-buttons">
            <button
              className="hero-btn explore-btn"
              onClick={() => navigate("/restaurants")}
            >
              Explore Restaurants
            </button>
            <button
              className="hero-btn order-btn"
              onClick={() => navigate("/orders")}
            >
              Order Now
            </button>
          </div>
        </div>
      </section>

      {/* Popular Restaurants Section */}
      <section className="categories">
        <h2 className="categories-title">Popular Restaurants</h2>
        <div className="categories-grid">
          {restaurants.length > 0 ? (
            restaurants.slice(0, 3).map((restaurant) => (
              <div key={restaurant.id} className="category-card">
                <img
                  src={`/images/${restaurant.image}`}
                  alt={restaurant.name}
                  className="category-image"
                />
                <p className="category-name">{restaurant.name}</p>
              </div>
            ))
          ) : (
            <p>Loading popular restaurants...</p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
