const {Router} = require('express')
const router = Router()

const cartControllers = require('../controllers/cartControllers')

//Crear carrito
router.post("/", cartControllers.createCart)

//Obtener carrito
router.get("/", cartControllers.getCart)

//Agregar producto al carrito
router.post("/:bid/product", cartControllers.addProduct)

module.exports = router