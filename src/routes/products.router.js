const {Router} = require('express')
const router = Router()
const authJwt = require('../middlewares/authJwt')
const productsControllers = require('../controllers/productsControllers')

//Obtener lista de productos
router.get("/", productsControllers.getProducts)

//Obtener producto por ID
router.get("/:pid", productsControllers.getProductById)

//Agregar productos
router.post("/", authJwt.verifyToken, authJwt.isAdmin, productsControllers.createProducts)

//Actualizar un producto
router.put("/:pid", authJwt.verifyToken, authJwt.isAdmin, productsControllers.updateProduct)

//Eliminar producto por su ID.
router.delete("/:pid", authJwt.verifyToken, authJwt.isAdmin, productsControllers.deleteProduct)

module.exports = router;


