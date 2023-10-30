const { Router } = require('express');
const cartController = require('../controllers/cartControllers')
const router = Router();

//Crear carrito
router.post("/cart", cartController.createCart)

//Agregando un producto al carrito con la cantidad deseada a un usuario determinado.
router.put("/cart/:cid/products/:pid/user/:uid", cartController.addCartWithProductInUser)

//Eliminar productos del carrito
router.delete("/cart/:cid", cartController.deleteProductsOfCart)


module.exports = router;