/* eslint-env mocha */
const supertest = require('supertest')

describe('movies-service', () => {
  const api = supertest('http://192.168.99.100:3000')

  it('returns a 200 for a collection of movies', (done) => {
    api.get('/movies/premiers')
      .expect(200, done)
  })
})
