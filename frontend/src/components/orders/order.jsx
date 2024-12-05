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

  const handleClearOrder = (orderIndex) => {
    const updatedOrders = [...orders];
    updatedOrders.splice(orderIndex, 1);
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
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
      const response = await fetch('http://localhost:5000/orders', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });

      if (!response.ok) throw new Error('Failed to confirm the order');
      
      return true; // Indicate success
    } catch (error) {
      console.error('Error confirming order:', error);
      alert('Error confirming order');
      return false; // Indicate failure
    }
  };

  const handleConfirmAllOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/orders/all', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orders),
      });

      if (!response.ok) throw new Error('Failed to confirm all orders');

      // Backend confirms all orders, so clear state and storage
      setOrders([]);
      localStorage.removeItem('orders');
      alert('All orders confirmed!');
    } catch (error) {
      console.error('Error confirming all orders:', error);
      alert('Error confirming all orders');
    }
  };

  const totalSum = orders.reduce((sum, order) => sum + order.totalPrice, 0);

  return (
    <div className="order-page">
      <h1>My Orders</h1>
      <div className="order-layout">
        {/* Order Cards (Left) */}
        <div className="orders-container">
          {orders.map((order, orderIndex) => (
            <div key={orderIndex} className="order-card">
              <div className="order-card-header">
                <h2 className="restaurant-name">{order.restaurantName}</h2>
                <h3 className="order-total-price">Total: ${order.totalPrice.toFixed(2)}</h3>
              </div>
              <ul className="order-items-list">
                {order.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="order-item">
                    <img
                      src={`/images/${item.image}`}
                      alt={item.name}
                      className="order-item-image"
                    />
                    <div className="order-item-details">
                      <p><strong>{item.name}</strong> x {item.quantity}</p>
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
              <div className="order-actions">
                <button
                  className="confirm-order-button"
                  onClick={() => handleConfirmOrder(order)}
                >
                  Confirm Order
                </button>
                <button
                  className="clear-order-button"
                  onClick={() => handleClearOrder(orderIndex)}
                >
                  Clear Order
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card (Right) */}
        <div className="summary-card">
          <h2>Order Summary</h2>
          <ul className="summary-list">
            {orders.map((order, index) => (
              <li key={index} className="summary-item">
                {order.restaurantName}: ${order.totalPrice.toFixed(2)}
              </li>
            ))}
          </ul>
          <h3>Total Sum: ${totalSum.toFixed(2)}</h3>
          <button className="confirm-all-button" onClick={handleConfirmAllOrders}>
            Confirm All Orders
          </button>
          <button className="clear-order-button" onClick={handleClearOrders}>
            Clear All Orders
          </button>
        </div>
      </div>
    </div>
  );
}

export default Order;
