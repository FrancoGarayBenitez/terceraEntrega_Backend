const config = require('../config/config.dotenv');

let Cart
let Products
let Users
let Order

switch (config.persistence) {
    case "MONGO":
        //Conexión con Mongo
        const mongoose = require('mongoose');
        const mongoDB = "mongodb+srv://francogaray4:fg_dbUser_84@cluster0.9vspn3d.mongodb.net/ecommerceProyectoFinal?retryWrites=true&w=majority";

        main().catch((err) => console.log(err));
        async function main() {
            await mongoose.connect(mongoDB);
            console.log("Conectado a la base de datos de MongoDB Atlas.");
        }

        //Importamos los datos de la base
        const CartMongo = require('./mongo/cartDataMongo')
        const ProductsMongo = require('./mongo/productsDataMongo')
        const UsersMongo = require('./mongo/usersDataMongo')
        const OrderMongo = require('./mongo/orderDataMongo')

        Cart = CartMongo
        Products = ProductsMongo
        Users = UsersMongo
        Order = OrderMongo

        break;

    case "MEMORY":
        const CartMemory = require('./memory/cartDataMemory')
        const ProductsMemory = require('./memory/productsDataMemory')
        const UsersMemory = require('./memory/usersDataMemory')
        const OrderMemory = require('./memory/orderDataMemory')

        Cart = CartMemory
        Products = ProductsMemory
        Users = UsersMemory
        Order = OrderMemory

        break;

    default:
        break;
}


module.exports = {
    Cart,
    Products,
    Users,
    Order
}