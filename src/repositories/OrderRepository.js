const OrderDTO = require('../dao/DTOs/order.dto')

class OrderRepository {
    constructor(dao){
        this.dao = dao
    }

    getOrder = async () => {
        let result = await this.dao.get()
        return result
    }

    getOrderById = async (oid) => {
        let result = await this.dao.getById(oid)
        return result
    }

    createOrder = async (order) => {
        let orderToInsert = new OrderDTO(order)
        let result = await this.dao.create(orderToInsert)
        return result
    }

    resolveOrder = async (oid, orderToReplace) => {
        let result = await this.dao.update(oid, orderToReplace)
        return result
    }
}

module.exports = OrderRepository