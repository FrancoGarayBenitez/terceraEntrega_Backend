const productService = require('../services/productsServices')

//Obtener lista de productos
async function getProducts(req, res) {
    try {
        let products = await productService.getProducts()

        const pageSize = parseInt(req.query.limit) || 10;  //Query limit opcional
        const page = parseInt(req.query.page) || 1;        //Query page opcional
        const orden = req.query.sort;                      //Query sort opcional
        let filtro = {}
        if (req.query.categoria) filtro = { categoria: req.query.categoria }
        if (req.query.stock) filtro = { stock: req.query.stock }

        const options = {
            page,
            limit: pageSize,
            sort: ({ "precio": orden }) || products
        };

        let result = await productService.paginateProducts(filtro, options)

        res.send({ result: "Success", payload: result });
        console.log(result);

    } catch (error) {
        res.send({ status: error, error: "Error al obtener información de los productos." })
    }
}


//Obtener producto por ID
async function getProductById(req, res) {
    try {
        let { pid } = req.params;

        let result = await productService.getProductById(pid)

        res.send({ result: "Success", payload: result });

    } catch (error) {
        res.send({ status: error, error: "Error al obtener un producto por su ID." });
    }
}


//Agregar productos
async function addProducts(req, res) {
    try {
        let { nombre, categoria, precio, stock, imagen } = req.body

        if (!nombre || !categoria || !precio || !stock || !imagen) {
            res.send({ status: "error", error: "Faltan parámetros para crear el producto." })
        }

        let result = await productService.addProducts(nombre, categoria, precio, stock, imagen)

        res.send({ result: "Success", payload: result });

    } catch (error) {
        res.send({ status: error, error: "Error al crear producto." });
    }
}


//Actualizar un producto
async function updateProduct(req, res) {
    try {
        let { pid } = req.params;
        let productToReplace = req.body;

        let result = await productService.updateProduct(pid, productToReplace)

        res.send({ result: "Success", payload: result });

    } catch (error) {
        res.send({ status: error, error: "Error al actualizar un producto." });
    }
}


//Eliminar producto por su ID.
async function deleteProductById(req, res) {
    try {
        let { pid } = req.params;

        let result = await productService.deleteProductById(pid)

        res.send({ result: "Success", payload: result });

    } catch (error) {
        res.send({ status: error, error: "Error al eliminar un producto." })
    }
}


module.exports = {
    getProducts,
    getProductById,
    addProducts,
    updateProduct,
    deleteProductById
}