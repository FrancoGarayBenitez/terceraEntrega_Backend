const { userModel } = require('../models/user.model');
const sessionService = require('../services/sessionsServices')

module.exports = {
    getUserById: async (uid) => await userModel.findById({ _id: uid }),

    getUserByEmail: async (email) => await userModel.findOne({ email: email }),

    updateUser: async (uid, user) => await userModel.updateOne({ _id: uid }, user),

    addCartInUser: (user, cid) => user.carts.push({ cart: cid, cart_sku: cid })
}