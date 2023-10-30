//Importaciones necesarias
const express = require('express');
const router = express.Router();
const sessionsControllers = require('../controllers/sessionsControllers')
const { userModel } = require('../models/user.model');
const { cartModel } = require('../models/cart.model');
const { productModel } = require('../models/product.model');
const { createHash, isValidatePassword } = require('../utils')
const passport = require('passport');
const jwt = require('jsonwebtoken');


//Renderizar vista de registro
router.get("/register", sessionsControllers.renderViewRegister)

//Renderizar vista de login
router.get("/", sessionsControllers.renderViewLogin)

//Renderizar vista del perfil una vez logeado
router.get('/profile', passport.authenticate("jwt", { session: false }), sessionsControllers.renderViewProfile)


//--------------------------------------------------------------------//

//Destruir session
router.get("/logout", sessionsControllers.destroySession)

//----------------------------------------------------------------------------//

//Registrar usuario (Estrategia local)
router.post("/register", passport.authenticate("register", { failureRedirect: "/api/sessions/failRegister" }), sessionsControllers.registerUser)

//Ruta por si no se logra hacer el passport register.
router.get('/failRegister', sessionsControllers.failRegister)


//-----------------------------------------------------------------------------//

//Autenticación con JWT
router.post("/", sessionsControllers.authenticateWithJwt)


//Ruta para devolver el actual usuario.
router.get("/current", passport.authenticate("jwt", { session: false }), sessionsControllers.currentUser)


//---------------------------------------------------------------//

//Autenticación. Estrategia con GitHub.
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }), async (req, res) => { })

router.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/api/sessions/" }), sessionsControllers.authenticateWithGitHub)


//--------------------------------------------------------------//

//Renderizar vista para cambiar password.
router.get('/restore', sessionsControllers.renderViewChangePassword)


//Cambiar contraseña.
router.post('/restore', sessionsControllers.changePassword)


module.exports = router;