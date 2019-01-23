const MongoClient = require('mongodb').MongoClient

const getMongoUrl = (options) => {
  const user = options.user
  const password = encodeURIComponent(options.password)
  return `mongodb+srv://${user}:${password}@node-react-todo-list-cluster-vnzzs.mongodb.net/test?retryWrites=true`
}

const connect = (options) => {
  return new Promise((resolve, reject) => {
    const client = new MongoClient(getMongoUrl(options), { useNewUrlParser: true })
    client.connect((err, client) => {
      if (err) {
        reject(new Error(`An error occured while connecting to MongoDB, err: ${err}`))
      }
      resolve(client.db('cinema'))
    })
  })
}

module.exports = Object.assign({}, { connect })
