const Joi = require("joi");
const bodyValidation = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const updateContactValidation = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email(),
  phone: Joi.string(),
  favorite: Joi.bool(),
}).min(1);

module.exports = { bodyValidation, updateContactValidation };
