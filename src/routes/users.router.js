const {Router} = require('express')
const router = Router()
const passport = require('passport');
const usersControllers = require('../controllers/usersControllers')

//Renderizar vista de registro
router.get("/register", usersControllers.renderViewRegister)

//Renderizar vista de login
router.get("/", usersControllers.renderViewLogin)

//Renderizar vista del perfil una vez logeado
router.get('/profile', usersControllers.renderViewProfile)

//--------------------------------------------------------------------//

//Destruir session
router.get("/logout", usersControllers.destroySession)

//--------------------------------------------------------------------//

//Registrar usuario (Estrategia local)
router.post("/register", passport.authenticate('local', { failureRedirect: "/api/sessions/failRegister" }), usersControllers.registerUser)

//Ruta por si no se logra hacer el passport register.
router.get('/failRegister', usersControllers.failRegister)

//--------------------------------------------------------------------//

//Autenticación con JWT
router.post("/", passport.authenticate('jwt', { session: false }), usersControllers.authenticateWithJwt)

//Ruta para devolver el actual usuario.
router.get("/current", passport.authenticate("jwt", { session: false }), usersControllers.currentUser)

//--------------------------------------------------------------------//

//Autenticación. Estrategia con GitHub.
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }))

router.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/api/sessions/" }), usersControllers.authenticateWithGitHub)

//--------------------------------------------------------------------//

//Renderizar vista para cambiar password.
router.get('/restore', usersControllers.renderViewChangePassword)

//Cambiar contraseña.
router.post('/restore', usersControllers.changePassword)

//--------------------------------------------------------------------//

module.exports = router