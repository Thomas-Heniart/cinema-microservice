/* eslint-env mocha */
const should = require('should')
const repository = require('./repository')

describe('Repository', () => {
  it('should connect with a promise', (done) => {
    repository.connect({}).should.be.a.Promise()
    done()
  })

  it('should connect to cinemas collection', (done) => {
    const fakeDb = {
      collection: (collectionName) => {
        should(collectionName).be.exactly('cinemas')
        done()
      }
    }
    repository.connect(fakeDb)
  })

  /* it('should find by city_id', (done) => {
    const db = {
      collection:
    }
  }) */
})
