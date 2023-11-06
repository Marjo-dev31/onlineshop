const express = require('express');

const adminController = require('../controllers/admin.controllers');
const imageUploadMiddleware = require('../middlewares/image-upload');

const router = express.Router();

router.get('/products', adminController.getProducts);

router.get('/products/new', adminController.getNewProduct);

router.post('/products', imageUploadMiddleware, adminController.createNewProduct)

router.get('/product/:id', adminController.getUpdateProduct);

router.post('/product/:id', adminController.updateProduct);

module.exports = router;