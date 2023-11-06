const express = require('express')
const app = express()
const PORT = 8080
const path = require('path')

//Servidor escuchando
app.listen(PORT, () => {
    console.log(`Servidor is running on port ${PORT}`);
})

//Config Handlebars
const handlebars = require('express-handlebars');
app.engine("handlebars", handlebars.engine())
app.set("views", path.join(__dirname, 'views'))
app.set("view engine", "handlebars")


//Persistir información de sesiones en una db.
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
app.use(session({
    store: new MongoDBStore({
        uri: "mongodb+srv://francogaray4:fg_dbUser_84@cluster0.9vspn3d.mongodb.net/ecommerceProyectoFinal?retryWrites=true&w=majority",
        collection: 'mySessions'
    }),
    secret: "coderSecret",
    resave: false,
    saveUninitialize: false
}))

//Middleware passport
const passport = require('passport');
const initializePassport = require('./config/passport.config');
initializePassport();
app.use(passport.initialize())
app.use(passport.session());

//Middleware cookie-parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//Middleware para analizar el cuerpo de las solicitudes.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Rutas
const cartRouter = require('./routes/cart.router')
const orderRouter = require('./routes/order.router')
const productsRouter = require('./routes/products.router')
const usersRouter = require('./routes/users.router')

app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)
app.use("/api/products", productsRouter)
app.use("/api/users", usersRouter)