const express = require("express");
const catchAsync = require("../utils/catchAsync");
const electives = require("../controllers/electives");
const reviews = require("../controllers/reviews");
const router = express.Router({ mergeParams: true });

router
  .route("/:id")
  .get(catchAsync(electives.electiveDetails))
  .post(catchAsync(reviews.createReview));

module.exports = router;
