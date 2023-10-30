const { productModel } = require('../models/product.model');

module.exports = {
    getProducts: async () => await productModel.find(),

    paginateProducts: async (filtro, options) => await productModel.paginate(filtro, options),

    getProductById: async (pid) => await productModel.findById({ _id: pid }),

    addProducts: async (nombre, categoria, precio, stock, imagen) => await productModel.create({ nombre, categoria, precio, stock, imagen }),

    updateProduct: async (pid, productToReplace) => await productModel.updateOne({ _id: pid }, productToReplace),

    deleteProductById: async (pid) => await productModel.deleteOne({ _id: pid })
}