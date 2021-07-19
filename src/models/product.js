const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProdutcSchema = new Schema({
    asin: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    priceLog: [{
        timestamp: String,
        price: Number
    }]
});

module.exports = mongoose.model('Product', ProdutcSchema);