const Elective = require("../models/elective");
const dummyData = require("./dummy_data");
const electivesData = require("./all_courses_data");
const mongoose = require("mongoose");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

mongoose.connect(
  process.env.MONGO_DB_URL || "mongodb://localhost:27017/electives-review",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connection open");
});

const seedDB = async () => {
  await Elective.deleteMany({});
  for (let elective of electivesData) {
    elective.reviews = [];
    const el = new Elective(elective);
    await el.save();
  }
};

seedDB().then(() => {
  db.close().then(() => console.log("connection closed"));
});
