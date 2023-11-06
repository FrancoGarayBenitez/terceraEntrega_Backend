const mongoose = require('mongoose');
const userCollection = "Users";

const userSchema = new mongoose.Schema({
    full_name: String,
    email: String,
    age: String,
    password: String,
    role: { type: String, default: "user" },

    orders: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Orders",
            autopopulate: true
        }
    ], default: []

    // cart: {
    //     type: mongoose.SchemaTypes.ObjectId,
    //     ref: "Carts",
    //     autopopulate: true,
    //     cart_sku: { type: String, required: true }
    // }

})


//Populate
userSchema.plugin(require('mongoose-autopopulate'));

const userModel = mongoose.model(userCollection, userSchema)

module.exports = { userModel };