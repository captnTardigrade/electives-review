const express = require("express");
const catchAsync = require("../utils/catchAsync");
const electives = require("../controllers/electives");
const reviews = require("../controllers/reviews");
const router = express.Router({ mergeParams: true });

const { hasReviewedElective, isLoggedIn } = require("../middleware");

router
  .route("/:id")
  .get(catchAsync(electives.electiveDetails))
  .post(isLoggedIn, hasReviewedElective, catchAsync(reviews.createReview));


module.exports = router;
