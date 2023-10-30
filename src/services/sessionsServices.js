const sessionsData = require('../persistence/sessionsData')

async function getUserById(uid) {
    return await sessionsData.getUserById(uid)
}

async function getUserByEmail(email) {
    return await sessionsData.getUserByEmail(email)
}

async function updateUser(uid, user) {
    return await sessionsData.updateUser(uid, user)
}

async function updateUserByEmail(email) {
    await sessionsData.updateUserByEmail(email)
}

function addCartInUser(user, cid) {
    sessionsData.addCartInUser(user, cid)
}


module.exports = {
    getUserById,
    getUserByEmail,
    updateUser,
    updateUserByEmail,
    addCartInUser
}