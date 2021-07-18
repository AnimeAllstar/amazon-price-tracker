const Url = require('url-parse');
const amazonScraper = require('amazon-buddy');

const Product = require('../models/product');

module.exports.addProduct = async (req, res) => {
    const url = new Url(req.query.url);
    const asin = getAsin(url);
    const details = await amazonScraper.asin({
        asin: asin,
        country: 'IN'
    });

    const price = details.result[0].price;
    const product = new Product({
        asin: asin,
        url: `${url.origin}/dp/${asin}`,
        currency: price.currency,
        priceLog: [{
            timestamp: Date.now(),
            price: price.current_price
        }]
    });
    await product.save();
    console.log('product added');
    res.json(product);
};

function getAsin(url) {
    const urlParams = url.pathname.split('/');
    for (let i = 0; i < urlParams.length; i++) {
        if (urlParams[i] === 'dp') {
            return urlParams[++i];
        }
    }
}