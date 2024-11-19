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

  const handleAddToOrder = (menuItem) => {
    console.log(`Added to order: ${menuItem.name}`);
    // Logic for adding the item to the order
  };

  return (
    <div className="menu-page">
      <h1>Menu</h1>
      <div className="menu-grid">
        {menuItems.length > 0 ? (
          menuItems.map((item) => (
            <div key={item._id} className="menu-card">
              {/* Menu item image */}
              <img
                src={`/images/${item.image}`} // Assuming images are in the "public/images" folder
                alt={item.name}
                className="menu-item-image"
              />

              {/* Menu item details */}
              <div className="menu-card-content">
                <h2 className="menu-item-name">{item.name}</h2>
                <p className="menu-item-description">{item.description}</p>
                <div className="menu-item-footer">
                  <p className="menu-item-price">${item.price}</p>
                  <button
                    className="add-to-order-button"
                    onClick={() => handleAddToOrder(item)}
                  >
                    +
                  </button>
                </div>
              </div>
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
