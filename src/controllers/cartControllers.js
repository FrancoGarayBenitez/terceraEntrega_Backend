const {cartServices} = require('../repositories/index.repositories')

//Crear carrito
const createCart = async (req, res) => {
    let { title, description } = req.body;

    let result = await cartServices.createCart({ title, description })

    if (!result) return res.status(500).send({status:"Error", error: "Algo salió mal al crear el carrito."})

    res.send({ result: "Success", payload: result });
}


//Obtener carrito
const getCart = async (req, res) => {
    let result = await cartServices.getCart()

    if (!result) return res.status(500).send({status:"Error", error: "Algo salió mal al obtener carrito."})

    res.send({status:"Success", result:result})
}

//Agregar producto al carrito
const addProduct = async(req, res) => {
    let product = req.body

    let cart = await cartServices.getCart()

    cart.products.push(product)

    await cartServices.updateCart(cart._id, cart)

    res.send({status:"Success", result:"Carrito actualizado"})
}

const updateCart = async (req, res) => {
    let cart = await cartServices.getCart()

    let result = await cartServices.updateCart(req.params.cid, cart)

    res.send({status:"success", result:result})
}

module.exports = {
    createCart,
    getCart,
    addProduct,
    updateCart
}