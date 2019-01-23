'use strict'
const status = require('http-status')

module.exports = (app, options) => {
  const { repository } = options

  app.get('/movies', (req, res, next) => {
    repository
      .getAllMovies()
      .then(movies => {
        res.status(status.OK).json(movies)
      })
      .catch(next)
  })

  app.get('/movies/premieres', (req, res, next) => {
    repository
      .getMoviePremieres()
      .then(movies => {
        res.status(status.OK).json(movies)
      })
      .catch(next)
  })

  app.get('/movies/:id', (req, res, next) => {
    repository
      .getMovieById(req.params.id)
      .then(movie => {
        res.status(status.OK).json(movie)
      })
      .catch(next)
  })
}
