'use strict'
const status = require('http-status')

module.exports = (app, options) => {
  const { repository } = options

  app.get('/cinemas', (req, res, next) => {
    const cityId = req.query.cityId
    repository.getCinemasByCity(cityId)
      .then(cinemas => {
        res.status(status.OK).json(cinemas)
      })
      .catch(next)
  })

  app.get('/cinemas/:cinemaId', (req, res, next) => {
    const cinemaId = req.params.cinemaId
    repository.getCinemaById(cinemaId)
      .then(cinema => {
        res.status(status.OK).json(cinema)
      })
      .catch(next)
  })

  app.get('/cinemas/:cityId/:movieId', (req, res, next) => {
    const params = {
      cityId: req.params.cityId,
      movieId: req.params.movieId
    }
    repository.getCinemaScheduleByMovie(params)
      .then(schedules => {
        res.status(status.OK).json(schedules)
      })
      .catch(next)
  })
}
