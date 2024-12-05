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
    // Fetch the restaurant name from the restaurant ID (assuming you have an API endpoint for this)
    fetch(`http://localhost:5000/restaurants/${id}`)
      .then((response) => response.json())
      .then((restaurant) => {
        const restaurantName = restaurant.name; // Assuming the restaurant name is in the 'name' field

        // Retrieve existing orders from localStorage
        const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    
        // Check if there's already an order for this restaurant
        const restaurantOrder = existingOrders.find(
          (order) => order.restaurantId === id
        );
    
        if (restaurantOrder) {
          // Check if the item is already in the order
          const existingItem = restaurantOrder.items.find((item) => item.name === menuItem.name);
    
          if (existingItem) {
            // Increase quantity if item exists
            existingItem.quantity += 1;
          } else {
            // Add new item to the restaurant order
            restaurantOrder.items.push({ ...menuItem, quantity: 1 });
          }
    
          // Update the total price
          restaurantOrder.totalPrice += menuItem.price;
        } else {
          // Add a new restaurant order
          existingOrders.push({
            restaurantId: id,
            restaurantName, // Add the restaurant name here
            items: [{ ...menuItem, quantity: 1 }],
            totalPrice: menuItem.price,
          });
        }
    
        // Save updated orders to localStorage
        localStorage.setItem('orders', JSON.stringify(existingOrders));
        alert(`${menuItem.name} added to your order!`);
      })
      .catch((error) => {
        console.error('Error fetching restaurant details:', error);
        alert('Error fetching restaurant name');
      });
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
