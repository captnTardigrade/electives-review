const Joi = require("joi");

module.exports.electiveSchema = Joi.object({
  elective: {
    name: Joi.string().required(),
    code: Joi.string().regex(RegExp("[A-Z]{2}d{4}")).required(),
    credits: Joi.string().regex(RegExp("\d-\d-\d-\d")).required(),
    description: Joi.string().required(),
    gradLevel: Joi.string().required()
  },
});

module.exports.reviewSchema = Joi.object({
  review: {
    date: Joi.date().required(),
    body: Joi.string().required(),
    rating: Joi.number().required().min(0).max(5),
  },
});

module.exports.userSchema = Joi.object({
  name: Joi.string().required(),
});
