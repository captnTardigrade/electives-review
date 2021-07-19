const Elective = require("../models/elective");
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
  elective.averageRating = Number.parseInt(rating);
  await newReview.save();
  await elective.save();
  res.redirect(`/electives/${id}`);
};

module.exports.updateReview = async (req, res) => {
  const { id, reviewId } = req.params;
  const { rating, body } = req.body.review;
  const elective = await Elective.findById(id);
  const review = {
    rating,
    body,
    date: Date.now(),
  };
  const { error } = reviewSchema.validate({ review });
  if (error) {
    throw new ExpressError(error.details[0].message, 500);
  }
  const newReview = await Review.findByIdAndUpdate(reviewId, review, {
    returnOriginal: true,
  });
  elective.averageRating = rating - newReview.rating;
  // console.log(elective.averageRating);
  await elective.save();
  res.redirect(`/electives/${id}`);
};

module.exports.deleteReview = async (req, res, next) => {
  const { id, reviewId } = req.params;
  await Elective.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId).catch((e) => next(e));
  req.flash("success", "Successfully deleted review");
  res.redirect(`/electives/${id}`);
};
