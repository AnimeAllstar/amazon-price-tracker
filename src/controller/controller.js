const Url = require('url-parse');
const puppeteer = require('puppeteer');

module.exports.addProduct = async (req, res) => {
    const url = new Url(req.query.url);
    const shortUrl = `${url.origin}/dp/${url.pathname.split('/').pop()}`;
    console.log(shortUrl);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(shortUrl);
    let price;
    try {
        price = await page.$eval('#priceblock_ourprice', (el) => el.innerHTML);
    } catch (err) {
        price = await page.$eval('#priceblock_dealprice', (el) => el.innerHTML);
    }
    console.log(price);
    await browser.close();
    res.send('product added');
};