const express = require('express');
const router = express.Router();
const { addOrderItems, getOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/auth');

router.post('/', protect, addOrderItems);
router.get('/', protect, admin, getOrders);
router.get('/:id', protect, admin, getOrderById);
router.put('/:id/pay', protect, admin, updateOrderToPaid);
router.put('/:id/deliver', protect, admin, updateOrderToDelivered); // Protection middleware to be added

module.exports = router;
