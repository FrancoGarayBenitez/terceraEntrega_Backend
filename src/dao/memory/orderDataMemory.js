class OrderMemory {
    constructor() {
        this.data = []
    }

    get = () => {
        return this.data
    }

    create = (order) => {
        this.data.push(order)
    }
}

module.exports = OrderMemory