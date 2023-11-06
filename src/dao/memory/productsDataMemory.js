class ProductsMemory {
    constructor() {
        this.data = []
    }

    get = () => {
        return this.data
    }

    create = (product) => {
        this.data.push(product)
    }

    delete = (index) => {
        this.data.splice(index, 1)
    }
}

module.exports = ProductsMemory