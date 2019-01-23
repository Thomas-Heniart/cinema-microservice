const dbSettings = {
  db: process.env.DB || 'movies',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
}

const serverSettings = {
  port: process.env.PORT || 3000
}

module.exports = Object.assign({}, { dbSettings, serverSettings })
