const Joi = require("joi");

// for future use
module.exports.electiveSchema = Joi.object({
  name: Joi.string().required(),
  code: Joi.string().regex(new RegExp("[A-Z]{2}d{4}")).required(),
  credits: Joi.string().regex(new RegExp("d-d-d-d")).required(),
  description: Joi.string().required(),
  gradLevel: Joi.string().required(),
});

module.exports.reviewSchema = Joi.object({
  date: Joi.date().required(),
  body: Joi.string().required(),
  rating: Joi.number().required().min(0).max(5),
});

module.exports.userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().regex(new RegExp("(.*)@iittp.ac.in")).required(),
  googleId: Joi.string().required(),
});
