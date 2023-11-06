const { productModel } = require('./models/productModel');

class ProductsMongo {
    constructor() {

    }

    get = async () => await productModel.find()

    getById = async (pid) => await productModel.findById({ _id: pid })

    create = async (nombre, categoria, precio, stock, imagen) => await productModel.create({ nombre, categoria, precio, stock, imagen })

    update = async (pid, productToReplace) => await productModel.updateOne({ _id: pid }, productToReplace)

    delete = async (pid) => await productModel.deleteOne({ _id: pid })

    paginate = async (filtro, options) => await productModel.paginate(filtro, options)

}


module.exports = ProductsMongo