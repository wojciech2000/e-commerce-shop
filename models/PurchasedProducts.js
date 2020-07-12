const mongoose = require('mongoose')

const PurchasedProducts = new mongoose.Schema({
    products: { type: Array }
})

module.exports = mongoose.model('purchasedProducts', PurchasedProducts)