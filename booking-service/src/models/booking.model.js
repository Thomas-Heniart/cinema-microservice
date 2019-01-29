const bookingSchema = (joi) => (joi.object().keys({
  city: joi.string().required(),
  schedule: joi.date().min('now').required(),
  movie: joi.string().required(),
  cinemaRoom: joi.number().required(),
  seats: joi.array().items(joi.string()).single().required(),
  totalAmount: joi.number().required()
}))

module.exports = bookingSchema
