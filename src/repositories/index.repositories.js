//Importando la persistencia del DAO
const { Cart, Products, Users, Order } = require('../dao/factory')

//Importando los repositorios
const CartRepository = require('./CartRepository')
const ProductRepository = require('./ProductsRepository')
const UserRepository = require('./UsersRepository')
const OrderRepository = require('./OrderRepository')

//Instancias a los repositorios
const cartServices = new CartRepository(new Cart())
const productsServices = new ProductRepository(new Products())
const usersServices = new UserRepository(new Users())
const orderServices = new OrderRepository(new Order())

module.exports = { cartServices, productsServices, usersServices, orderServices }