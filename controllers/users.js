const User = require("../models/user");
const passport = require("passport");

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login");
};

module.exports.login = async (req, res) => {
  req.flash("success", "Logged in!");
  const redirectUrl = req.session.url || "/";
  delete req.session.url;
  res.redirect(redirectUrl);
};

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup");
};

module.exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const newUser = new User({ username: email, name });
  const registeredUser = await User.register(newUser, password).catch((e) => {
    req.flash("error", e.message);
    res.redirect("/signup");
    return;
  });
  req.login(registeredUser, (err) => {
    if (err) return next(err);
    req.flash("success", "Registered successfully");
    res.redirect("/");
  });
};

module.exports.logout = (req, res) => {
  req.logout();
  req.flash("success", "Logged out");
  res.redirect("/");
};
