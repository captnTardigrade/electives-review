const express = require("express");
const users = require("../controllers/users");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");
const { isNotLoggedIn } = require("../middleware");
const router = express.Router();

router
  .route("/login")
  .get(isNotLoggedIn, users.renderLoginForm)
  .post(
    isNotLoggedIn,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
      failureMessage: true,
    }),
    catchAsync(users.login)
  );

router
  .route("/signup")
  .get(isNotLoggedIn, users.renderSignupForm)
  .post(isNotLoggedIn, catchAsync(users.signup));

router.get("/logout", users.logout);

module.exports = router;
