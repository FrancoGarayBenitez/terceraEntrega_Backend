class CartMemory {
    constructor() {
        this.data = []
    }

    get = () => {
        return this.data
    }

    create = (cart) => {
        this.data.push(cart)
    }
}

module.exports = CartMemory