import React, { useState, useEffect } from 'react';
import './order.css';

function Order() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);
  }, []);

  const handleClearOrders = () => {
    localStorage.removeItem('orders');
    setOrders([]);
  };

  const handleRemoveItem = (orderIndex, itemIndex) => {
    const updatedOrders = [...orders];
    updatedOrders[orderIndex].items.splice(itemIndex, 1);

    updatedOrders[orderIndex].totalPrice = updatedOrders[orderIndex].items.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );

    if (updatedOrders[orderIndex].items.length === 0) {
      updatedOrders.splice(orderIndex, 1);
    }

    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  const handleConfirmOrder = async (order) => {
    try {
      // Send POST request to backend to save order
      const response = await fetch('http://localhost:5000/orders', { 
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          restaurantId: order.restaurantId,
          restaurantName: order.restaurantName,  
          items: order.items,
          totalPrice: order.totalPrice,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to confirm the order');
      }

      const data = await response.json();
      console.log('Order confirmed:', data);

      alert('Order confirmed!');
      
      // Remove the confirmed order from localStorage and update the state
      const updatedOrders = orders.filter((o) => o !== order);
      setOrders(updatedOrders);
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
    } catch (error) {
      console.error('Error confirming order:', error);
      alert('Error confirming order');
    }
  };

  return (
    <div className="order-page">
      <h1>Your Orders</h1>
      {orders.length > 0 ? (
        <div className="orders-container">
          {orders.map((order, orderIndex) => (
            <div key={orderIndex} className="order-card">
              {/* Header with Restaurant Name and Total Price */}
              <div className="order-card-header">
                <h2 className="restaurant-name">{order.restaurantName}</h2>
                <h3 className="order-total-price">Total: ${order.totalPrice.toFixed(2)}</h3>
              </div>

              {/* List of Items */}
              <ul className="order-items-list">
                {order.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="order-item">
                    <img
                      src={`/images/${item.image}`}
                      alt={item.name}
                      className="order-item-image"
                    />
                    <div className="order-item-details">
                      <p>
                        <strong>{item.name}</strong> x {item.quantity}
                      </p>
                      <p>${item.price.toFixed(2)}</p>
                    </div>
                    <button
                      className="remove-item-button"
                      onClick={() => handleRemoveItem(orderIndex, itemIndex)}
                    >
                      🗑️
                    </button>
                  </li>
                ))}
              </ul>

              {/* Action Buttons */}
              <div className="order-actions">
                <button
                  className="confirm-order-button"
                  onClick={() => handleConfirmOrder(order)}
                >
                  Confirm Order
                </button>
                <button className="clear-order-button" onClick={handleClearOrders}>
                  Clear Order
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>You have no orders yet!</p>
      )}
    </div>
  );
}

export default Order;
