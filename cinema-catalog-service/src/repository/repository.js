'use strict'
const ObjectId = require('mongodb').ObjectID

const repository = (db) => {
  const collection = db.collection('cinemas')

  const getCinemasByCity = (cityId) => {
    return new Promise((resolve, reject) => {
      const cinemas = []
      const query = { city_id: cityId }
      const projection = { _id: 1, name: 1 }

      const cursor = collection.find(query, projection)

      const addCinema = (cinema) => {
        cinemas.push(cinema)
      }
      const sendCinemas = (err) => {
        if (err) {
          reject(new Error(`An error occured fecthing cinemas for cityId: ${cityId}, err: ${err}`))
        }
        resolve(cinemas)
      }
      cursor.forEach(addCinema, sendCinemas)
    })
  }

  const getCinemaById = (cinemaId) => {
    return new Promise((resolve, reject) => {
      const query = { _id: new ObjectId(cinemaId) }
      const projection = { _id: 1, name: 1, cinemaPremieres: 1 }
      const response = (err, cinema) => {
        if (err) {
          reject(new Error(`An error occured fetching cinema with id: ${cinemaId}, err: ${err}`))
        }
        resolve(cinema)
      }
      collection.find(query, projection, response)
    })
  }

  const getCinemaScheduleByMovie = (options) => {
    return new Promise((resolve, reject) => {
      const match = {
        $match: {
          'city_id': options.cityId,
          'cinemaRooms.schedules.movie_id': options.moveId
        }
      }
      const project = {
        $project: {
          'name': 1,
          'cinemaRooms.schedules.time': 1,
          'cinemaRooms.name': 1,
          'cinemaRooms.format': 1
        }
      }
      const unwind = [{ $unwid: '$cinemaRooms' }, { $unwid: '$cinemaRooms.schedules' }]
      const group = [{
        $group: {
          _id: {
            name: '$name',
            room: '$cinemaRooms.name'
          },
          schedules: { $addToSet: '$cinemaRooms.schedules.time' }
        }
      }, {
        $group: {
          _id: '$_id.name',
          schedules: {
            $addToSet: {
              room: '$_id.room',
              schedules: '$schedules'
            }
          }
        }
      }]
      const sendSchedules = (err, result) => {
        if (err) {
          reject(new Error(`An error occured while fetching cinema schedule by movie, err: ${err}`))
        }
        resolve(result)
      }
      collection.aggregate([match, project, ...unwind, ...group], sendSchedules)
    })
  }

  const disconnect = () => {
    connection.db.close()
  }

  return Object.create({
    getCinemasByCity,
    getCinemaById,
    getCinemaScheduleByMovie,
    disconnect
  })
}

const connect = (connection) => {
  return new Promise((resolve, reject) => {
    if (!connection) {
      reject(new Error('connection db not supplied'))
    }
    resolve(repository(connection))
  })
}

module.exports = Object.assign({}, { connect })
