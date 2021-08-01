if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const path = require("path");
const engine = require("ejs-mate");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const app = express();
const User = require("./models/user");
const userRoutes = require("./routes/users");
const reviewRoutes = require("./routes/reviews");
const electiveRoutes = require("./routes/electives");
const session = require("express-session");
const passport = require("passport");
const { userSchema } = require("./utils/joiSchemas");
const ExpressError = require("./utils/ExpressError");
const MongoDBStore = require("connect-mongo");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const dbUrl =
  process.env.MONGO_DB_URL || "mongodb://localhost:27017/electives-review";

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
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
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET || "91CC97C2D91EF5C9227537666B5E3",
    store: MongoDBStore.create({
      mongoUrl: dbUrl,
      touchAfter: 24 * 60 * 60,
      crypto: {
        secret: process.env.SECRET || "91CC97C2D91EF5C9227537666B5E3",
      },
    }),
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://pandos-electives-review.herokuapp.com/login/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ googleId: profile.id }, async (err, user) => {
        if (err) return done(err);
        if (!user) {
          const userObj = {
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
          };
          const { error } = userSchema.validate(userObj);
          if (error) {
            return done(new ExpressError(error.details[0].message, 500));
          }
          const newUser = new User(userObj);
          await newUser.save();
          return done(err, newUser);
        } else {
          return done(err, user);
        }
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(async function (id, done) {
  await User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.use((req, res, next) => {
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  res.locals.currentUser = req.user;
  next();
});

app.use("/", userRoutes);
app.use("/electives", electiveRoutes);
app.use("/electives/:id/reviews", reviewRoutes);

app.get("/", async (req, res) => {
  const categories = [
    "CE",
    "CH",
    "CS",
    "CY",
    "EE",
    "HS",
    "MA",
    "ME",
    "PH",
    "ID",
  ];
  res.render("home", { categories });
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
