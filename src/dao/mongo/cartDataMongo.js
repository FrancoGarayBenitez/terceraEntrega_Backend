const { cartModel } = require('./models/cartModel');

class CartMongo {
    constructor() {

    }

    get = async () => {
        return await cartModel.find()
    }

    create = async (title) => {
        return await cartModel.create({ title })
    }

    update = async (cid, cart) => {
        return await cartModel.updateOne({ _id: cid }, cart)
    }

    // addQuantity = (cart, indexProduct, quantity) => {
    //     cart.products[indexProduct].quantity += quantity || 1
    // }

    // addProduct = (cart, pid, quantity) => cart.products.push({ product: pid, quantity: quantity, product_sku: pid })

}


module.exports = CartMongo