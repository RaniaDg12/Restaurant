const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.createOrder);

router.get('/', orderController.getOrders);

router.get('/restaurant/:restaurantId', orderController.getOrdersByRestaurant);

router.delete('/:id', orderController.deleteOrder);

module.exports = router;
