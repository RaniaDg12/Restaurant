const express = require('express');
const router = express.Router();
const menuItemController = require('../controllers/menuController');

router.post('/restaurant/:restaurantId', menuItemController.createMenuItem);

router.get('/restaurant/:restaurantId', menuItemController.getMenuItems);

router.get('/restaurant/:restaurantId/:menuItemId', menuItemController.getMenuItemById);

router.put('/restaurant/:restaurantId/:menuItemId', menuItemController.updateMenuItem);

router.delete('/restaurant/:restaurantId/:menuItemId', menuItemController.deleteMenuItem);

module.exports = router;


















/*

// CREATE a new menu item
router.post('/', async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const newMenuItem = new MenuItem({
      name,
      description,
      price,
      category,
    });
    await newMenuItem.save();
    res.status(201).json(newMenuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// READ all menu items
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// READ a single menu item by ID
router.get('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a menu item by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedMenuItem) return res.status(404).json({ message: 'Menu item not found' });
    res.status(200).json(updatedMenuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a menu item by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedMenuItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deletedMenuItem) return res.status(404).json({ message: 'Menu item not found' });
    res.status(200).json({ message: 'Menu item deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
*/


module.exports = router;
