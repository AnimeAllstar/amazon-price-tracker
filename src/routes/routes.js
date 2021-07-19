const router = require('express').Router();
const controller = require('../controllers/controller');

router.get('/', (req, res) => {
    res.render('index.html');
});

router.get('/add-product', controller.addProduct);

module.exports = router;