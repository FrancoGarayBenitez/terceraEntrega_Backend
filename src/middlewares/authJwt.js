const {usersServices} = require('../repositories/index.repositories')
const jwt = require('jsonwebtoken')

// Roles disponibles
const ROLES = ["user", "admin"]

//Validar Token
const verifyToken = async (req, res, next) => {
    try {
        // Obtener token de cookie
        const token = req.cookies["jwtCookie"]
        if (!token) return res.status(403).json({ status: "error", error: "No token provided." })

        //Obtenemos el usuario a partir del token
        let decoded = jwt.verify(token, "coderSecret")
        req.userId = decoded.id

        // Buscar usuario con el Id del token recibido
        const user = await usersServices.getUserById(req.userId)
        if (!user) return res.status(404).json({ message: 'No user found' })
        next()

    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

// Validar que el usuario sea de role admin
const isAdmin = async (req, res, next) => {
    const user = await usersServices.getUserById(req.userId)

    for (let i = 0; i < ROLES.length; i ++) {
        if(user.role === "admin") {
            next()
            return
        }
    }

    return res.status(403).json({message:"Require Admin role"})
}

// Validar que el usuario sea de role user 
const isUser = async (req, res, next) => {
    const user = await usersServices.getUserById(req.userId)

    for (let i = 0; i < ROLES.length; i ++) {
        if(user.role === "user") {
            next()
            return
        }
    }

    return res.status(403).json({message:"Require User role"})
}

module.exports = { verifyToken, isAdmin, isUser, ROLES }


