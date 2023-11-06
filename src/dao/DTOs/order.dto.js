class OrderDTO {
    constructor(order) {
        this.number = order.number
        this.totalPrice = order.totalPrice
        this.status = order.status
    }
}

module.exports = OrderDTO