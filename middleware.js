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
