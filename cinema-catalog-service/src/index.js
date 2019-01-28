'use strict'
const server = require('./server/server')
const repository = require('./repository/repository')
const config = require('./config/')

console.log('--- Cinema catalog Service ---')
console.log('Connecting to cinemas repository')

process.on('uncaughtException', (err) => {
  console.error('Undhandle exception', err)
})

process.on('unhandledRejection', (err, promise) => {
  console.error('Undhandled rejection', err)
})

config.db
  .connect(config.dbSettings)
  .then((db) => {
    let rep
    repository
      .connect(db)
      .then((repo) => {
        console.log('Repository connected. Starting server')
        rep = repo
        return server.start({
          port: config.serverSettings.port,
          ssl: config.serverSettings.ssl,
          debug: config.serverSettings.debug,
          repository: repo
        })
      })
      .then((app) => {
        console.log(`Server started successfully, running on port: ${config.serverSettings.port}.`)
        app.on('close', () => {
          rep.disconnect()
          db.close()
        })
      })
  })
