'use strict'
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const spdy = require('spdy')
const cinemaCatalogAPI = require('../api/cinemas-catalog')

const start = (options) => {
  return new Promise((resolve, reject) => {
    if (!options.repository) {
      reject(new Error('The server must be started with a connected repository'))
    }

    if (!options.port) {
      reject(new Error('The server must be startted with an available port'))
    }

    const app = express()
    app.use(morgan('dev'))
    app.use(helmet())
    app.use((err, req, res, next) => {
      reject(new Error(`Something went wrong!, err: ${err}`))
      res.status(500).send('Something went wrong')
    })

    cinemaCatalogAPI(app, options)

    const debugApp = options.debug ? app : spdy.createServer(options.ssl, app)

    const server = debugApp.listen(options.port, () => resolve(server))
  })
}

module.exports = Object.assign({}, { start })