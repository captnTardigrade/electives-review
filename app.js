const express = require("express");
const path = require("path");
const engine = require("ejs-mate");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const app = express();
const Elective = require("./models/elective");
const User = require("./models/user");
const userRoutes = require("./routes/users");
const electiveRoutes = require("./routes/electives");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const ExpressError = require("./utils/ExpressError");

const { isLoggedIn } = require("./middleware");

mongoose.connect("mongodb://localhost:27017/electives-review", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connection open");
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.engine("ejs", engine);
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET || "91CC97C2D91EF5C9227537666B5E3",
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
    // TODO: Verify the settings with the session store
    // at the time of production
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy({ usernameField: "email" }, User.authenticate())
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  res.locals.currentUser = req.user;
  next();
});

app.use("/", userRoutes);
app.use("/electives", electiveRoutes);

app.get("/", async (req, res) => {
  const electives = await Elective.find({});
  res.render("home", { electives });
});

app.get("*", (req, res) => {
  throw new ExpressError("Page Not Found", 404);
});

app.use((err, req, res, next) => {
  res.render("error", { err });
  next();
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
