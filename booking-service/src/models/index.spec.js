/* eslint-env mocha */
const assert = require('assert')
const should = require('should')
const validate = require('./').validate

const now = new Date()
now.setDate(now.getDate() + 1)

describe('Schemas validation', () => {
  it('can validate a booking object', (done) => {
    const testBooking = {
      city: 'City',
      schedule: now,
      movie: 'Movie',
      cinemaRoom: 1,
      seats: ['1'],
      totalAmount: 1
    }

    validate(testBooking, 'booking')
      .then(value => {
        should(value).be.containEql(testBooking)
      })
      .catch(err => {
        should.fail({}, testBooking, err.message)
      })
      .finally(done)
  })

  it('can validate a ticket object', (done) => {
    const testTicket = {
      cinema: 'Cinema',
      schedule: now,
      movie: 'Movie',
      seats: ['1'],
      cinemaRoom: 1,
      orderId: 1
    }

    validate(testTicket, 'ticket')
      .then(value => {
        should(value).be.containEql(testTicket)
      })
      .catch(err => {
        assert.fail({}, testTicket, err.message)
      })
      .finally(done)
  })
})
