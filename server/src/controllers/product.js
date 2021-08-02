const Url = require('url-parse');
const amazonScraper = require('amazon-buddy');

const Product = require('../models/product');
const User = require('../models/user');

module.exports.addProduct = async (req, res) => {
  const email = new Url(req.body.email);
  const url = new Url(req.body.url);
  const asin = getAsin(url);

  const doesExist = await Product.exists({
    asin: asin,
  });

  let product;
  console.log(doesExist);

  if (doesExist) {
    product = await Product.findOneAndUpdate({ asin: asin }, { $inc: { refCount: 1 } });
  } else {
    console.log('here');
    const details = await amazonScraper.asin({
      asin: asin,
      country: 'IN',
    });

    let price = details.result[0].price;
    const currency = price.currency;
    price = price.current_price == 0 ? price.before_price : price.current_price;
    const title = details.result[0].title;
    const link = `${url.origin}/dp/${asin}`;
    const img = details.result[0].main_image;
    const log = [
      {
        timestamp: Date.now(),
        price: price,
      },
    ];
    product = new Product({
      asin: asin,
      title: title,
      url: link,
      img: img,
      currency: currency,
      priceLog: log,
      refCount: 1,
    });
    await product.save();
  }

  await User.findOneAndUpdate({ email: email }, { $push: { productLog: asin } });

  console.log('product added');
  console.log(product);
  res.json(product);
};

module.exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

module.exports.getProduct = async (req, res) => {
  const product = await Product.find({
    asin: req.params.asin,
  });
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
