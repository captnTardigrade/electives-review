const express = require("express");
const catchAsync = require("../utils/catchAsync");
const electives = require("../controllers/electives");
const router = express.Router({ mergeParams: true });

router.route("/:id").get(catchAsync(electives.electiveDetails));

module.exports = router;
