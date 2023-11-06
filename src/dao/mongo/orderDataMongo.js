const orderModel = require('./models/orderModel')

class OrderMongo {
    constructor(){

    }

    get = async () => await orderModel.find()

    getById = async (oid) => await orderModel.findById({_id: oid})

    create = async (order) => await orderModel.create(order)

    resolve = async (oid, order) => await orderModel.updateOne({_id:oid}, {$set:order})

}


module.exports = OrderMongo