const productsData = require('../persistence/productsData')

async function getProducts() {
    return await productsData.getProducts()
}

async function paginateProducts(filtro, options) {
    return await productsData.paginateProducts(filtro, options)
}

async function getProductById(pid) {
    return await productsData.getProductById(pid)
}

async function addProducts(nombre, categoria, precio, stock, imagen) {
    return await productsData.addProducts(nombre, categoria, precio, stock, imagen)
}

async function updateProduct(pid, productToReplace) {
    return await productsData.updateProduct(pid, productToReplace)
}

async function deleteProductById(pid) {
    return await productsData.deleteProductById(pid)
}

module.exports = {
    getProducts,
    paginateProducts,
    getProductById,
    addProducts,
    updateProduct,
    deleteProductById
}