const router = require('express').Router();
const controller = require('../controllers/product');

router.post('/add-product', controller.addProduct);

router.get('/products', controller.getProducts);

router.get('/product/:asin', controller.getProduct);

module.exports = router;
