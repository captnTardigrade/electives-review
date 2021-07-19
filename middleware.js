const Elective = require("./models/elective");
const Review = require("./models/review");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.url = req.originalUrl;
    req.flash("error", "You are not logged in!");
    return res.redirect("/login");
  }
  next();
};

module.exports.isNotLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.flash("error", "You are already logged in!");
    return res.redirect("/");
  }
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "Unauthorized");
    return res.redirect(`/electives/${id}`);
  }
  next();
};

module.exports.hasReviewedElective = async (req, res, next) => {
  const { id } = req.params;
  const elective = await Elective.findById(id).populate({
    path: "reviews",
    populate: { path: "author" },
  });
  const review = elective.reviews.find((r) => r.author.equals(req.user._id));
  if (review) {
    req.flash("warning", "You have already reviewed this course!");
    return res.redirect(`/electives/${id}`);
  }
  next();
};
