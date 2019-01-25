'use strict'
const status = require('http-status')

module.exports = (app, options) => {
  const { repository } = options

  app.get('/cinemas', (req, res, next) => {
    const cityId = req.query.cityId
    repository.getCinemasByCity(cityId)
      .then(cinemas => res.status(status.OK).json(cinemas))
      .catch(next)
  })

  app.get('/cinemas/:cinemaId', (req, res, next) => {
    const cinemaId = req.params.cinemaId
    repository.getCinemaById(cinemaId)
      .then(cinema => res.status(status.OK).json(cinema))
      .catch(next)
  })

  app.get('/cinemas/:cinemaId/:movieId', (req, res, next) => {
    const cinemaId = req.params.cinemaId
    const movieId = req.params.movieId
    console.error('trololo')
    repository.getCinemaScheduleByMovie(cinemaId, movieId)
      .then(schedules => res.status(status.OK).json(schedules))
      .catch(next)
  })
}
