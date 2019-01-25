/* eslint-env mocha */
const request = require('supertest')
const server = require('../server/server')

const currentDate = new Date()
const currentYear = currentDate.getFullYear()
const currentMonth = currentDate.getMonth() + 2
const currentDay = currentDate.getDay()

describe('Movies API', () => {
  let app = null
  let testMovies = [{
    'id': '3',
    'title': 'xXx: Reactivado',
    'format': 'IMAX',
    'releaseYear': 2017,
    'releaseMonth': 1,
    'releaseDay': 20
  }, {
    'id': '4',
    'title': 'Resident Evil: Capitulo Final',
    'format': 'IMAX',
    'releaseYear': 2017,
    'releaseMonth': 1,
    'releaseDay': 27
  }, {
    'id': '1',
    'title': 'Assasins Creed',
    'format': 'IMAX',
    'releaseYear': currentYear,
    'releaseMonth': currentMonth,
    'releaseDay': currentDay
  }]

  let testRepo = {
    getAllMovies () {
      return Promise.resolve(testMovies)
    },
    getMoviePremieres () {
      return Promise.resolve(testMovies.filter(movie => movie.releaseYear === currentYear))
    },
    getMovieById (id) {
      return Promise.resolve(testMovies.find(movie => movie.id === id))
    }
  }

  beforeEach(() => {
    return server.start({
      port: 3000,
      repository: testRepo,
      debug: true
    }).then(serv => {
      app = serv
    })
  })

  afterEach(() => {
    app.close()
    app = null
  })

  it('can return all movies', (done) => {
    request(app)
      .get('/movies')
      .expect((res) => {
        res.body.should.containEql({
          'id': '1',
          'title': 'Assasins Creed',
          'format': 'IMAX',
          'releaseYear': currentYear,
          'releaseMonth': currentMonth,
          'releaseDay': currentDay
        })
      })
      .expect(200, done)
  })

  it('can get movie premiers', (done) => {
    request(app)
      .get('/movies/premieres')
      .expect((res) => {
        res.body.should.containEql({
          'id': '1',
          'title': 'Assasins Creed',
          'format': 'IMAX',
          'releaseYear': currentYear,
          'releaseMonth': currentMonth,
          'releaseDay': currentDay
        })
      })
      .expect(200, done)
  })

  it('returns 200 for an known movie', (done) => {
    request(app)
      .get('/movies/1')
      .expect((res) => {
        res.body.should.containEql({
          'id': '1',
          'title': 'Assasins Creed',
          'format': 'IMAX',
          'releaseYear': currentYear,
          'releaseMonth': currentMonth,
          'releaseDay': currentDay
        })
      })
      .expect(200, done)
  })
})
