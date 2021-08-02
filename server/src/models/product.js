const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProdutcSchema = new Schema({
  asin: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  currency: {
    type: String,
    required: true,
  },
  priceLog: [
    {
      timestamp: String,
      price: Number,
    },
  ],
  refCount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Product', ProdutcSchema);
