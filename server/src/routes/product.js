const router = require('express').Router();
const controller = require('../controllers/product');

router.get('/add-product', controller.addProduct);

router.get('/products', controller.getProducts);

module.exports = router;
