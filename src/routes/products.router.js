const { Router } = require('express');
const productsController = require('../controllers/productsControllers')
const router = Router();

//Obtener lista de productos
router.get("/products", productsController.getProducts)


//Obtener producto por ID
router.get("/products/:pid", productsController.getProductById)


//Agregar productos
router.post("/products", productsController.addProducts)


//Actualizar un producto
router.put("/products/:pid", productsController.updateProduct)


//Eliminar producto por su ID.
router.delete("/products/:pid", productsController.deleteProductById)


module.exports = router;