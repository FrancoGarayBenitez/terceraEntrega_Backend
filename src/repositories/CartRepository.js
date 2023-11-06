const CartDTO = require('../dao/DTOs/cart.dto')

class CartRepository {
    constructor(dao) {
        this.dao = dao
    }

    getCart = async () => {
        let result = await this.dao.get()
        return result
    }

    createCart = async (cart) => {
        let cartToInsert = new CartDTO(cart)
        let result = await this.dao.create(cartToInsert)
        return result
    }

    updateCart = async (cid, cart) => {
        let result = await this.dao.update(cid, cart)
        return result
    }

    addQuantityInProduct = (cart, indexProduct, quantity) => {
        let result = this.dao.addQuantity(cart, indexProduct, quantity)
        return result
    }

    addProductInCart = (cart, pid, quantity) => {
        let result = this.dao.addProduct(cart, pid, quantity)
        return result
    }

}

module.exports = CartRepository