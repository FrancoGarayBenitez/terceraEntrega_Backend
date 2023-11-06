const { userModel } = require('./models/userModel');

class UsersMongo {
    constructor() {

    }

    get = async () => await userModel.find()

    getById = async (uid) => await userModel.findById({ _id: uid })

    getByEmail = async (email) => await userModel.findOne({ email: email })

    update = async (uid, user) => await userModel.updateOne({ _id: uid }, user)

    addCart = (cid, user) => user.cart.push({ cart: cid, cart_sku: cid })
}


module.exports = UsersMongo