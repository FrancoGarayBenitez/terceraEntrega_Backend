const {usersServices} = require('../repositories/index.repositories')

//Renderizar vista de registro
const renderViewRegister = (req, res) => {
    try {
        res.render("register.handlebars")
    } catch (error) {
        res.status(500).send("Error de presentación.")
    }
}

//Renderizar vista de login
const renderViewLogin = (req, res) => {
    try {
        res.render("login.handlebars")
    } catch (error) {
        res.status(500).send("Error de presentación.")
    }
}

//Renderizar vista del perfil una vez logeado
const renderViewProfile = (req, res) => {
    try {
        if (!req.user) {
            return res.redirect('/api/sessions');
        }

        let { first_name, last_name, email, age, role } = req.session.user;

        res.render('profile.handlebars', {
            first_name, last_name, email, age, role
        })

    } catch (error) {
        res.status(500).send("Error de presentación.")
    }
}

//--------------------------------------------------------------------//

//Destruir session
const destroySession = (req, res) => {
    req.session.destroy(err => {
        if (!err) {
            res.redirect('/api/sessions')
        } else {
            res.send("Error al intentar salir.")
        }
    })
}

//--------------------------------------------------------------------//

//Registrar usuario (Estrategia local)
const registerUser = (req, res) => {
    try {
        console.log("Usuario registrado correctamente.");
        res.redirect("/api/sessions")

    } catch (error) {
        res.status(500).send("Error de registro.")
    }
}

//Ruta por si no se logra hacer el passport register.
const failRegister = (req, res) => {
    console.log("Failed strategy");
    res.send({ error: "Failed" })
}

//--------------------------------------------------------------------//

//Autenticación con JWT
const authenticateWithJwt = async (req, res) => {
    try {
        let { email, password } = req.body

        //Buscar usuario en la base.
        let user = await usersServices.getUserByEmail(email)
        if (!user) return res.send({ message: "Usuario no registrado" })

        //Comparación del pass del usuario con el pass hasheado.
        const { isValidatePassword } = require('../utils')
        if (!isValidatePassword(user, password)) return res.send({ message: "Contraseña incorrecta." });

        //Creación del token.
        let token = jwt.sign({ email, password }, "coderSecret", { expiresIn: "24h" });

        //El cliente envía sus credenciales mediante una cookie.
        res.cookie("jwt", token, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true
        })

        req.session.user = {
            first_name: user.first_name,
            last_name: user.last_name,
            age: user.age,
            email: user.email,
            role: user.role,
        }

        res.redirect("/api/sessions/profile")

    } catch (error) {
        res.status(500).send("Error al logearse.")
    }
}  


//Ruta para devolver el actual usuario.
const currentUser = (req, res) => {
    res.send(req.user)
}


//--------------------------------------------------------------------//

//Autenticación. Estrategia con GitHub.
const authenticateWithGitHub = (req, res) => {
    req.session.user = req.user;
    res.redirect("/api/sessions/profile")
}

//--------------------------------------------------------------------//

//Renderizar vista para cambiar password.
const renderViewChangePassword = (req, res) => {
    try {
        res.render('restore.handlebars')
    } catch (error) {
        res.status(500).send("Error de presentación.")
    }
}

//Cambiar contraseña.
const changePassword = async (req, res) => {
    try {
        let { email, newPassword } = req.body;
        if (!email || !newPassword) return res.status(400).send({ status: "error", error: "Valores inexistentes" })

        //Verificar existencia de usuario en db
        let user = await usersServices.getUserByEmail(email)
        if (!user) return res.status(400).send({ status: "error", error: "Usuario no encontrado" })

        //Actualizando password con hash
        const { createHash } = require('../utils')
        user.password = createHash(newPassword);

        //Actualizamos usuario en la base con su nuevo password.
        await usersServices.updateUser(user._id, user)

        //Redirigir para logearse.
        console.log("Contraseña cambiada correctamente.");
        res.redirect("/api/sessions");

    } catch (error) {
        res.status(500).send("Error al cambiar contraseña.")
    }
}

module.exports = {
    renderViewRegister,
    renderViewLogin,
    renderViewProfile,
    destroySession,
    registerUser,
    failRegister,
    authenticateWithJwt,
    currentUser,
    authenticateWithGitHub,
    renderViewChangePassword,
    changePassword
}