const express = require("express");
const users = require("../controllers/users");
const catchAsync = require("../utils/catchAsync");
const router = express.Router();

router.route("/login").get(users.renderLoginForm);

router.route("/signup").get(users.renderSignupForm);

module.exports = router;
