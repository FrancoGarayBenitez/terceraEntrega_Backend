const { cartModel } = require('../models/cart.model');


module.exports = {
    getCart: async (cid) => await cartModel.findById({ _id: cid }),

    createCart: async (title) => await cartModel.create({ title }),

    updateCart: async (cart, cid) => await cartModel.updateOne({ _id: cid }, cart),

    addQuantityInProduct: (cart, indexProduct, quantity) => cart.products[indexProduct].quantity += quantity || 1,

    addProductInCart: (cart, quantity, pid) => cart.products.push({ product: pid, quantity: quantity, product_sku: pid })
}