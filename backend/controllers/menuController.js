const MenuItem = require('../models/menuitem');
const Restaurant = require('../models/restaurant'); 

const createMenuItem = async (req, res) => {
    try {
      const { name, description, price, image, category } = req.body;
      const restaurant = await Restaurant.findById(req.params.restaurantId);
  
      if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }
  
      // Create new menu item
      const newMenuItem = new MenuItem({
        name,
        description,
        price,
        image,
        category,
      });
  
      // Save menu item
      await newMenuItem.save();
  
      // Add the menu item to the restaurant's menuItems array
      restaurant.menuItems.push(newMenuItem);
      await restaurant.save();
  
      res.status(201).json(newMenuItem);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

const getMenuItems =  async (req, res) => {
    try {
      const restaurant = await Restaurant.findById(req.params.restaurantId).populate('menuItems');
  
      if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }
  
      res.status(200).json(restaurant.menuItems);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

const getMenuItemById = async (req, res) => {
    try {
      const restaurant = await Restaurant.findById(req.params.restaurantId);
  
      if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }
  
      const menuItem = await MenuItem.findById(req.params.menuItemId);
  
      if (!menuItem) {
        return res.status(404).json({ message: 'Menu item not found' });
      }
  
      res.status(200).json(menuItem);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

const updateMenuItem = async (req, res) => {
    try {
      const { name, description, price, category } = req.body;
      const restaurant = await Restaurant.findById(req.params.restaurantId);
  
      if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }
  
      const updatedMenuItem = await MenuItem.findByIdAndUpdate(
        req.params.menuItemId,
        { name, description, price, image, category },
        { new: true }
      );
  
      if (!updatedMenuItem) {
        return res.status(404).json({ message: 'Menu item not found' });
      }
  
      res.status(200).json(updatedMenuItem);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

const deleteMenuItem = async (req, res) => {
    try {
      const restaurant = await Restaurant.findById(req.params.restaurantId);
  
      if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }
  
      const deletedMenuItem = await MenuItem.findByIdAndDelete(req.params.menuItemId);
  
      if (!deletedMenuItem) {
        return res.status(404).json({ message: 'Menu item not found' });
      }
  
      // Remove the deleted menu item from the restaurant's menuItems array
      restaurant.menuItems.pull(deletedMenuItem);
      await restaurant.save();
  
      res.status(200).json({ message: 'Menu item deleted' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };


module.exports = {
    createMenuItem,
    getMenuItems,
    getMenuItemById,
    updateMenuItem,
    deleteMenuItem,
  };