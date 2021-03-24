const express = require('express');
const router = express.Router();

const {getAllOrders, placedOrder} = require('../controllers/orderController');

router.post('/orderPlaced', placedOrder);

router.get('/getAllOrders', getAllOrders);

module.exports = router;