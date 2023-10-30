const cartData = require('../persistence/cartData');

async function getCart(cid) {
    return await cartData.getCart(cid)
}

async function createCart(title) {
    return await cartData.createCart(title)
}

async function updateCart(cart, cid) {
    await cartData.updateCart(cart, cid)
}

function addQuantityInProduct(cart, indexProduct, quantity) {
    cartData.addQuantityInProduct(cart, indexProduct, quantity)
}

function addProductInCart(cart, quantity, pid) {
    cartData.addProductInCart(cart, quantity, pid)
}


module.exports = {
    getCart,
    createCart,
    addQuantityInProduct,
    addProductInCart,
    updateCart
}