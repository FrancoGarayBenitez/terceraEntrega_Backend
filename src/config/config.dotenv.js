const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    persistence: process.env.PERSISTENCE
}