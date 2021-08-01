const express = require("express");
const users = require("../controllers/users");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");
const { isNotLoggedIn } = require("../middleware");
const router = express.Router();

router.route("/login").get(
  isNotLoggedIn,
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.route("/login/callback").get(
  isNotLoggedIn,
  passport.authenticate("google", {
    failureRedirect: "/",
    failureFlash: "Could not log you in! Please try again",
    successRedirect: "/",
    successFlash: "Logged you in!",
  })
);

router.get("/logout", users.logout);

module.exports = router;
