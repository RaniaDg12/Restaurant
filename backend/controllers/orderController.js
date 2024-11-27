const Order = require('../models/order');

// Create a new order
const createOrder = async (req, res) => {
  const { restaurantId, restaurantName, items } = req.body;

  // Calculate the total price
  const totalPrice = items.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

  try {
    const newOrder = new Order({
      restaurantId,
      restaurantName,
      items,
      totalPrice,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order', message: error.message });
  }
};

const addAllOrders = async (req, res) => {
  const orders = req.body;

  // Process all orders (e.g., save them to a database)
  try {
    // Example: Save each order in the database
    orders.forEach(order => {
      // Save logic here
    });

    res.status(200).send({ message: 'All orders confirmed!' });
  } catch (error) {
    res.status(500).send({ message: 'Failed to confirm orders', error });
  }
};

// Get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders', message: error.message });
  }
};

// Get orders by restaurant
const getOrdersByRestaurant = async (req, res) => {
  const { restaurantId } = req.params;
  try {
    const orders = await Order.find({ restaurantId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders', message: error.message });
  }
};

// Delete an order by ID
const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete order', message: error.message });
  }
};

module.exports = {
  createOrder,
  addAllOrders,
  getOrders,
  getOrdersByRestaurant,
  deleteOrder,
};
