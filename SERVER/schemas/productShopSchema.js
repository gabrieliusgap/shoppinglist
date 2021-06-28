const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const productShopSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },

})

const mainPSschema = mongoose.model("productShopSchema", productShopSchema)

module.exports = mainPSschema