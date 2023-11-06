class UsersMemory {
    constructor() {
        this.data = []
    }

    get = () => {
        return this.data
    }

    create = (user) => {
        this.data.push(user)
    }

    delete = (index) => {
        this.data.splice(index, 1)
    }
}

module.exports = UsersMemory