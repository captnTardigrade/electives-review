const Elective = require("../models/elective");
const ExpressError = require("../utils/ExpressError");

module.exports.electiveDetails = async (req, res) => {
  const { id } = req.params;
  const elective = await Elective.findById(id).populate({
    path: "reviews",
    populate: { path: "author" },
  });
  if (!elective) {
    throw new ExpressError("Cannot find that elective", 404);
  }
  let userReview;
  let otherReviews;
  if (req.user) {
    userReview = elective.reviews.find((review) =>
      review.author.equals(req.user._id)
    );
    otherReviews = elective.reviews.filter(
      (review) => !review.author.equals(req.user._id)
    );
  }
  res.render("electives/details", { elective, userReview, otherReviews });
};
