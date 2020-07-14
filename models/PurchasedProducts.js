const mongoose = require('mongoose')

const currentDateTime = new Date()
const date = `${currentDateTime.getDate()} - ${currentDateTime.getMonth()+1 < 10 ?  '0' + parseInt(currentDateTime.getMonth()+1) : currentDateTime.getMonth()+1} - ${currentDateTime.getFullYear()}`

const PurchasedProducts = new mongoose.Schema({
    date: { type: String, default: date },
    totalPrice: { type: Number },
    totalQuantity: { type: Number },
    products: [Object]
})

module.exports = mongoose.model('purchasedProducts', PurchasedProducts)