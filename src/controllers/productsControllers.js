const {productsServices} = require('../repositories/index.repositories')

//Obtener los productos
const getProducts = async (req, res) => {
    try {
        const pageSize = parseInt(req.query.limit) || 10;  //Query limit opcional
        const page = parseInt(req.query.page) || 1;        //Query page opcional

        let filtro = {}
        if (req.query.categoria) filtro = { categoria: req.query.categoria }
        if (req.query.stock) filtro = { stock: req.query.stock }

        let orden
        if (req.query.sort) {
            orden = {precio: req.query.sort}
        } else {
            orden = null
        }

        const options = {
            page,
            limit: pageSize,
            sort: orden
        };

        let result = await productsServices.paginateProducts(filtro, options)
        res.send({ result: "Success", payload: result });

    } catch (error) {
        res.send({ status: error, error: "Error al obtener información de los productos." })
    }
}


//Obtener producto por ID
const getProductById = async (req, res) => {
    try {
        let { pid } = req.params;

        let result = await productsServices.getProductById(pid)

        res.send({ result: "Success", payload: result });

    } catch (error) {
        res.send({ status: error, error: "Error al obtener un producto por su ID." });
    }
}


//Agregar productos
const createProducts = async(req, res) => {
    try {
        let { title, categoria, precio, stock, imagen } = req.body

        if (!title || !categoria || !precio || !stock || !imagen) {
            res.send({ status: "error", error: "Faltan parámetros para crear el producto." })
        }

        let product = {
            title,
            categoria,
            precio,
            stock,
            imagen
        }

        let result = await productsServices.createProduct(product)

        res.send({ result: "Success", payload: result });

    } catch (error) {
        res.send({ status: error, error: "Error al crear producto." });
    }
}

//Actualizar un producto
const updateProduct = async (req, res) => {
    try {
        let { pid } = req.params;
        let productToReplace = req.body;

        let result = await productsServices.updateProduct(pid, productToReplace)

        res.send({ result: "Success", payload: result });

    } catch (error) {
        res.send({ status: error, error: "Error al actualizar un producto." });
    }
}

//Eliminar producto por su ID.
const deleteProduct = async (req, res) => {
    try {
        let { pid } = req.params;

        let result = await productsServices.deleteProduct(pid)

        res.send({ result: "Success", payload: result });

    } catch (error) {
        res.send({ status: error, error: "Error al eliminar un producto." })
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProducts,
    updateProduct,
    deleteProduct
}