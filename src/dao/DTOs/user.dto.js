class UserDTO {
    constructor(user) {
        this.full_name = user.first_name + user.last_name
        this.email = user.email
        this.age = user.age
        this.password = user.password
        this.active = true
        this.phone = user.phone ? user.phone.split("-").join('') : ''
    }
}

module.exports = UserDTO