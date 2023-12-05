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

// Obtener lista de usuarios
const getUsersList = async (req, res) => {
    try {
        let users_list = await usersServices.getUsers()

        res.status(200).json({message:"Success", payload:users_list})
        
    } catch (error) {
        res.status(400).json({message:"Error al obtener lista de usuarios."})
    }
}

// Obtener usuario por ID
const userById = async (req, res) => {
    try {
        let {uid} = req.params
        let user = await usersServices.getUserById(uid)

        if (!user) return res.send({ message: "Usuario no registrado" })

        res.status(200).json({message:"Success", payload:user})

    } catch (error) {
        res.status(404).json("Error al obtener usuario.")
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
        const jwt = require('jsonwebtoken');
        let token = jwt.sign({ id: user._id }, "coderSecret", { expiresIn: "24h" });

        //El cliente envía sus credenciales mediante una cookie.
        res.cookie("jwtCookie", token, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true
        })

        req.session.user = {
            full_name: user.full_name,
            age: user.age,
            email: user.email,
            role: user.role,
        }

        res.redirect("/api/sessions/current")

    } catch (error) {
        res.status(500).send("Error al logearse.")
    }
}  


//Ruta para devolver el actual usuario.
const currentUser = (req, res) => {
    try {
        if (!req.user) {
            return res.redirect('/api/sessions');
        }

        let { full_name, email, age, role } = req.session.user;

        res.render('current.handlebars', {
            full_name, email, age, role
        })

    } catch (error) {
        res.status(500).send("Error de presentación.")
    }
}


//--------------------------------------------------------------------//

//Autenticación. Estrategia con GitHub.
const authenticateWithGitHub = (req, res) => {
    console.log(req.user);
    req.session.user = req.user;
    res.redirect("/api/sessions/current")
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
    getUsersList,
    userById,
    destroySession,
    registerUser,
    failRegister,
    authenticateWithJwt,
    currentUser,
    authenticateWithGitHub,
    renderViewChangePassword,
    changePassword
}