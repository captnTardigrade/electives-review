const Elective = require("../models/elective");
const User = require("../models/user");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
  const { id } = req.params;
  const elective = await Elective.findById(id);
  const author = await User.findById("60f2e1fe18975105aeb70a55");
  const { rating, body } = req.body.review;
  const review = new Review({
    rating,
    body,
    author,
  });
  elective.reviews.push(review);
  await review.save();
  await elective.save();
  res.redirect(`/electives/${id}`);
};
