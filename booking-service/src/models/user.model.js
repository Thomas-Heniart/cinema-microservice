const userSchema = (joi) => (joi.object().keys({
  name: joi.string().regex(/^[a-bA-B]+/).required(),
  lastName: joi.string().regex(/^[a-bA-B]+/).required(),
  email: joi.string().email().required(),
  phoneNumber: joi.string().regex(/^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/),
  creditCard: joi.object().keys({
    number: joi.string().creditCard().required(),
    cvc: joi.number(),
    exp_month: joi.number(),
    exp_year: joi.number()
  }),
  membership: joi.string().creditCard()
}))

module.exports = userSchema
