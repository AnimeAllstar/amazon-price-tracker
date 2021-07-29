const Url = require('url-parse');
const amazonScraper = require('amazon-buddy');

const Product = require('../models/product');

module.exports.addProduct = async (req, res) => {
  const url = new Url(req.query.url);
  const asin = getAsin(url);
  const details = await amazonScraper.asin({
    asin: asin,
    country: 'IN',
  });

  let price = details.result[0].price;
  price = price.current_price == 0 ? price.before_price : price.current_price;
  const product = new Product({
    asin: asin,
    url: `${url.origin}/dp/${asin}`,
    currency: price.currency,
    priceLog: [
      {
        timestamp: Date.now(),
        price: price,
      },
    ],
  });
  await product.save();
  console.log('product added');
  res.json(product);
};

module.exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

function getAsin(url) {
  const urlParams = url.pathname.split('/');
  for (let i = 0; i < urlParams.length; i++) {
    if (urlParams[i] === 'dp') {
      return urlParams[++i];
    }
  }
}
