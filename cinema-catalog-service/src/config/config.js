const dbSettings = {
  db: process.env.DB || 'cinema',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  debug: process.env.DEBUG
}

const serverSettings = {
  port: process.env.PORT || 3000,
  ssl: process.env.DEBUG ? null : require('./ssl'),
  debug: process.env.DEBUG
}

module.exports = Object.assign({}, { dbSettings, serverSettings })
