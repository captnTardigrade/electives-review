const express = require("express");
const reviews = require("../controllers/reviews");
const catchAsync = require("../utils/catchAsync");
const router = express.Router({ mergeParams: true });

const { isLoggedIn, isReviewAuthor } = require("../middleware");

router
  .route("/:reviewId")
  .put(isLoggedIn, isReviewAuthor, catchAsync(reviews.updateReview))
  .delete(isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;
