const mongoose = require('mongoose')

const PurchasedProducts = new mongoose.Schema({
    products: [Object]
})

module.exports = mongoose.model('purchasedProducts', PurchasedProducts)