const {orderServices, usersServices, cartServices} = require('../repositories/index.repositories')

//Obtener ordenes
const getOrder = async(req, res) => {
    try {
        let result = await orderServices.getOrder()
    
        res.send({status:"Success", result:result})
    } catch (error) {
        res.send({ status: error, error: "Error al obtener las ordenes." });
    }
}

//Obtener orden por Id
const getOrderById = async(req, res) => {
    try {
        const {oid} = req.params
    
        let order = await orderServices.getOrderById(oid)
    
        res.send({status:"Success", result:order})
    } catch (error) {
        res.send({ status: error, error: "Error al obtener orden por su ID." });
    }
}


//Crear orden
const createOrder = async(req, res) => {
    try {
        const {user, cart} = req.body

        const resultUser = await usersServices.getUserById(user)
        const resultCart = await cartServices.getCart()
    
        let actualOrders = resultCart.products.filter(product => products.includes(product.id))
    
        let sum = actualOrders.reduce((acc, prev) => {
            acc += prev.price
            return acc
        }, 0)
    
        let orderNumber = Date.now() + Math.floor(Math.random() * 10000 + 1)
    
        let order = {
            number: orderNumber,
            cart: resultCart._id,
            totalPrice: sum,
            status: "Pendiente"
        }
    
        let orderResult = await orderServices.createOrder(order)
    
        resultUser.orders.push(orderResult._id)
        
        await usersServices.updateUser(user, resultUser)
        await cartServices.updateCart(cart, resultCart)
    
        res.send({status:"Success", result:orderResult})

    } catch (error) {
        res.send({ status: error, error: "Error al crear orden." });
    }

}

// Resolución orden
const resolveOrder = async(req, res) => {
    try {
        const {resolve} = req.query
    
        let order = await orderServices.getOrderById(req.params.oid)
    
        order.status = resolve
    
        await orderServices.resolveOrder(order._id, order)
    
        res.send({status:"Success", result:"Resolución correcta."})
    
    } catch (error) {
        res.send({ status: error, error: "Error al resolver orden." });
    }
}


module.exports = {
    getOrder,
    getOrderById,
    createOrder,
    resolveOrder
}


