const cron = require('cron');
const amazonScraper = require('amazon-buddy');

const Product = require('../models/product');

const CronJob = cron.CronJob;

const updateLogsJob = new CronJob('0 0 * * *', async () => {
  const res = await Product.find({});
  console.log('Updating price log');
  await updatePriceLog(res);
  console.log('Completed Update!');
});

function updatePriceLog(log) {
  log.forEach(async (product) => {
    await Product.updateOne(
      {
        asin: product.asin,
      },
      {
        $push: {
          priceLog: await getLastestPrice(product.asin),
        },
      }
    );
  });
}

async function getLastestPrice(asin) {
  const details = await amazonScraper.asin({
    asin: asin,
    country: 'IN',
  });
  return {
    timestamp: Date.now(),
    price: details.result[0].price.current_price,
  };
}

module.exports.start = () => {
  updateLogsJob.start();
};
