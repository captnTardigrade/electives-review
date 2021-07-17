const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  body: {
    type: String,
    required: [true, "Review is required!"],
  },
  rating: {
    type: Number,
    required: [true, "Rating is required!"],
  },
//   TODO: add the functionality of likes
//   upvotes: {
//     type: Number,
//   },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Review", ReviewSchema);
