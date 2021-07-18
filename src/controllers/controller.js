const Url = require('url-parse');
const puppeteer = require('puppeteer');

const Product = require('../models/product');

module.exports.addProduct = async (req, res) => {
    const url = new Url(req.query.url);
    const urlParams = url.pathname.split('/');
    let asin;
    for (let i = 0; i < urlParams.length; i++) {
        if (urlParams[i] === 'dp') {
            asin = urlParams[++i];
            break;
        }
    }
    const shortUrl = `${url.origin}/dp/${asin}`;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(shortUrl);
    let price;
    try {
        price = await page.$eval('#priceblock_ourprice', (el) => el.innerHTML);
    } catch (err) {
        price = await page.$eval('#priceblock_dealprice', (el) => el.innerHTML);
    }
    const currency = price.substring(0, 1);
    price = Number.parseFloat(price.substr(1).replace(',', ''));
    await browser.close();
    const product = new Product({
        asin: asin,
        url: shortUrl,
        currency: currency,
        priceLog: [{
            timestamp: Date.now(),
            price: price
        }]
    });
    await product.save();
    console.log('product added');
    res.send('product added');
};