const {Router} = require('express')
const router = Router()

const productsControllers = require('../controllers/productsControllers')

//Obtener lista de productos
router.get("/", productsControllers.getProducts)

//Obtener producto por ID
router.get("/:pid", productsControllers.getProductById)

//Agregar productos
router.post("/", productsControllers.createProducts)

//Actualizar un producto
router.put("/:pid", productsControllers.updateProduct)

//Eliminar producto por su ID.
router.delete("/:pid", productsControllers.deleteProduct)

module.exports = router;


