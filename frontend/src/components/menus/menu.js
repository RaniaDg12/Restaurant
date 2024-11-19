import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './menu.css';

function Menu() {
  const { id } = useParams(); // Get the restaurant ID from the URL
  const [menuItems, setMenuItems] = useState([]);

  // Fetch menu items for the restaurant
  useEffect(() => {
    fetch(`http://localhost:5000/menu/restaurant/${id}`)
      .then((response) => response.json())
      .then((data) => setMenuItems(data))
      .catch((error) => console.error('Error fetching menu items:', error));
  }, [id]);

  return (
    <div className="menu-page">
      <h1>Menu</h1>
      <div className="menu-grid">
        {menuItems.length > 0 ? (
          menuItems.map((item) => (
            <div key={item._id} className="menu-card">
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p><strong>Price:</strong> {item.price}</p>
              <p><strong>Category:</strong> {item.category}</p>
            </div>
          ))
        ) : (
          <p>No menu items available for this restaurant.</p>
        )}
      </div>
    </div>
  );
}

export default Menu;
