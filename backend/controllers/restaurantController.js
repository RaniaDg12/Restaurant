const Restaurant = require('../models/restaurant');

// Helper function to determine restaurant status
const calculateStatus = (restaurant) => {
  const currentHour = new Date().toLocaleTimeString('en-US', { hour12: false }).slice(0, 5); // Current time in HH:mm format
  return currentHour >= restaurant.openingHour && currentHour < restaurant.closingHour ? 'Open' : 'Closed';
};

// Get all restaurants with their status
const getRestaurants = async (req, res) => {
    try {
      const restaurants = await Restaurant.find();
      const enrichedRestaurants = restaurants.map((restaurant) => ({
        ...restaurant.toObject(),
        status: calculateStatus(restaurant), // Add status dynamically
      }));
      res.json(enrichedRestaurants);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch restaurants', message: error.message });
    }
  };
  
  // Get a specific restaurant by its ID
  const getRestaurantById = async (req, res) => {
    try {
      const restaurant = await Restaurant.findById(req.params.id);
      if (!restaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
      res.json(restaurant);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch restaurant', message: error.message });
    }
  };
  
  // Add a new restaurant
  const addRestaurant = async (req, res) => {
    try {
      const newRestaurant = new Restaurant(req.body);
      const savedRestaurant = await newRestaurant.save();
      res.status(201).json(savedRestaurant);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create restaurant', message: error.message });
    }
  };
  
  // Update a restaurant
  const updateRestaurant = async (req, res) => {
    try {
      const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedRestaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
      res.json(updatedRestaurant);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update restaurant', message: error.message });
    }
  };
  
  // Delete a restaurant
  const deleteRestaurant = async (req, res) => {
    try {
      const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);
      if (!deletedRestaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
      res.json({ message: 'Restaurant deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete restaurant', message: error.message });
    }
  };
  
  module.exports = {
    getRestaurants,
    getRestaurantById,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
  };