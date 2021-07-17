const express = require("express");
const path = require("path");
const engine = require("ejs-mate");
const mongoose = require("mongoose");
const app = express();
const Elective = require("./models/elective");
const userRoutes = require("./routes/users");
const electiveRoutes = require("./routes/electives");

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

app.use("/", userRoutes);
app.use("/electives", electiveRoutes);
app.use("/electives/:id/reviews", electiveRoutes);
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const electives = await Elective.find({});
  res.render("home", { electives });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
