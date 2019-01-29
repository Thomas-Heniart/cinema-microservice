const ticketSchema = (joi) => (joi.object().keys({
  cinema: joi.string().required(),
  schedule: joi.date().min('now').required(),
  movie: joi.string().required(),
  seats: joi.array().items(joi.string()).single().required(),
  cinemaRoom: joi.number().required(),
  orderId: joi.number().required()
}))

module.exports = ticketSchema
