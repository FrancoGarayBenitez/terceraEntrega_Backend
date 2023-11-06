const mongoose = require('mongoose')

const collection = "Orders"

const orderSchema = new mongoose.Schema({
    number: Number,
    business: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Carts",
        autopopulate: true
    },
    totalPrice: Number,
    status: String
})

//Populate
orderSchema.plugin(require('mongoose-autopopulate'));

const orderModel = mongoose.model(collection, orderSchema)

module.exports = orderModel