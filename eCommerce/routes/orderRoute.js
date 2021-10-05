const express = require('express');
const router = express.Router();
const { addOrder, getOrderById, updateOrderToPaid, getMyOrder } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, addOrder);
router.route('/myorders').get(protect, getMyOrder);
router.route('/:id').get(protect, getOrderById);

// update order to pay
router.route('/:id/pay').put(protect, updateOrderToPaid);


module.exports = router;
