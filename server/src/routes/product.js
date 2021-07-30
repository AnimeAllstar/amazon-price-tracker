const router = require('express').Router();
const controller = require('../controllers/product');

router.post('/add-product', controller.addProduct);

router.get('/products', controller.getProducts);

module.exports = router;
