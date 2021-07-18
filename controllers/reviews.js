const Elective = require("../models/elective");
const User = require("../models/user");
const { reviewSchema } = require("../utils/joiSchemas");
const Review = require("../models/review");
const ExpressError = require("../utils/ExpressError");

module.exports.createReview = async (req, res) => {
  const { id } = req.params;
  const elective = await Elective.findById(id);
  const { rating, body } = req.body.review;
  const review = {
    rating,
    body,
    date: Date.now(),
  };
  const { error } = reviewSchema.validate({ review });
  if (error) {
    throw new ExpressError(error.details[0].message, 500);
  }
  const newReview = new Review(review);
  newReview.author = req.user;
  elective.reviews.push(newReview);
  await newReview.save();
  await elective.save();
  res.redirect(`/electives/${id}`);
};
