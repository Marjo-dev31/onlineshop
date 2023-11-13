const express = require('express');

const cartController = require('../controllers/cart.controller');

const router = express.Router();

// router.get('/cart', cartController.);

router.post('/items', cartController.addCartItem)

module.exports = router
