/* eslint-env mocha */
const server = require('./server')

describe('Server', () => {
  it('should require a port to start', (done) => {
    server.start({
      repository: {},
      debug: true
    }).should.be.rejectedWith(/port/)
    done()
  })

  it('should require a repository to start', (done) => {
    server.start({
      port: {},
      debug: true
    }).should.be.rejectedWith(/repository/)
    done()
  })
})
