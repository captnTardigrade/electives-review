const Elective = require("../models/elective");
const dummyData = require("../seeds/dummy_data.json");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/electives-review", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connection open");
});

const seedDB = async () => {
    await Elective.deleteMany({});
    for(let elective of dummyData) {
        const el = new Elective(elective);
        el.credits = el.credits % 5 + 1;
        await el.save();
    }
};

seedDB().then(() => {
  db.close().then(() => console.log("connection closed"));
});
