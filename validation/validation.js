const Joi = require("joi");

const bodyValidation = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool().default(false),
});

const updateContactValidation = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email(),
  phone: Joi.string(),
}).min(1);

const updateStatusContactValidation = Joi.object({
  favorite: Joi.bool().required(),
});

module.exports = {
  bodyValidation,
  updateContactValidation,
  updateStatusContactValidation,
};
