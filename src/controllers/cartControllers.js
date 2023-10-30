const cartService = require('../services/cartServices');
const productService = require('../services/productsServices');
const userService = require('../services/sessionsServices');

//Crear carrito
async function createCart(req, res) {
    let { title } = req.body;

    const result = await cartService.createCart(title)

    res.send({ result: "Success", payload: result });
}



//Agregando un producto al carrito con la cantidad deseada a un usuario determinado.
async function addCartWithProductInUser(req, res) {
    try {
        let { cid } = req.params;
        let { pid } = req.params;
        let { uid } = req.params;
        let { quantity } = req.body;

        //Buscamos carrito por su ID
        let cart = await cartService.getCart(cid)
        if (!cart) {
            res.status(404).json({ error: `El carrito con el id proporcionado no existe` })
        }

        //Buscamos producto por su ID.
        let product = await productService.getProductById(pid)
        if (!product) {
            res.status(404).json({ error: `El producto con el id proporcionado no existe` })
        }

        //Buscamos usuario por su ID
        let user = await userService.getUserById(uid)
        if (!user) {
            res.status(404).json({ error: `El usuario con el id proporcionado no existe` })
        }

        //Validamos la existencia del producto en el carrito
        const foundProductInCart = cart.products.find((p) => {
            return p.product_sku === pid
        })

        //Si existe le actualizamos la cantidad enviada por body.
        //Si no existe pusheamos el nuevo producto con la cantidad enviada por body.
        const indexProduct = cart.products.findIndex((p) => p.product_sku === pid)
        if (foundProductInCart) {
            cartService.addQuantityInProduct(cart, indexProduct, quantity)
        } else {
            cartService.addProductInCart(cart, quantity, pid)
        }

        //Actualizamos las modificaciones del carrito.
        await cartService.updateCart(cart, cid)

        //Buscamos carrito nuevamente para el populate.
        cart = await cartService.getCart(cid)


        //----------------------------------------------------------//

        //Validamos la existencia del carrito en el usuario
        const foundCartInUser = user.carts.find((c) => {
            return c.cart_sku === cid
        })

        //Si no existe pusheamos el nuevo carrito en el usuario con los productos
        //De lo contrario solo se actualiza el carrito existente del usuario.
        if (!foundCartInUser) {
            userService.addCartInUser(user, cid)
        }

        //Actualizamos las modificaciones del usuario.
        await userService.updateUser(uid, user)

        //Buscamos usuario nuevamente para el populate.
        user = await userService.getUserById(uid)

        //Presentación del usuario con su carrito
        console.log(JSON.stringify(user, null, '\t'));
        res.send({ result: "Success", payload: user });

    } catch (error) {
        res.send({ status: error, error: "Error al agregar producto al carrito." });
    }

}



//Eliminar productos del carrito
async function deleteProductsOfCart(req, res) {
    try {
        let { cid } = req.params;

        //Buscamos carrito por su ID
        let cart = await cartService.getCart(cid)
        if (!cart) {
            res.status(404).json({ error: `El carrito con el id proporcionado no existe` })
        }

        //Vaciamos el array products del carrito.
        cart.products = [];

        //Actualizamos las modificaciones del carrito.
        let result = await cartService.updateCart(cart, cid)
        console.log(JSON.stringify(cart, null, '\t'));
        res.send({ result: "Success", payload: cart });

    } catch (error) {
        res.status(404).json({ error: `Error al eliminar un producto.` })
    }
}


module.exports = {
    createCart,
    addCartWithProductInUser,
    deleteProductsOfCart
}