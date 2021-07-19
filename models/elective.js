const mongoose = require("mongoose");

const ElectiveSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  credits: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  totalRating: {
    type: Number,
    default: 0,
  },
});

ElectiveSchema.virtual("averageRating")
  .get(function () {
    return this.reviews.length ? Math.round((this.totalRating / this.reviews.length) * 100) / 100
    : 0;
  })
  .set(function (val) {
    this.totalRating += val;
  });
module.exports = mongoose.model("Elective", ElectiveSchema);
