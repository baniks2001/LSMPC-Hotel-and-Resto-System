const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const reserveController = require('../controllers/reserveController');

// Create a new order (POST request)
router.post('/orders', orderController.createOrder);
router.post('/food_sales', orderController.createSales);
router.get('/food_sales', orderController.getSales);
router.post('/reservations', reserveController.createReservation);

module.exports = router;
