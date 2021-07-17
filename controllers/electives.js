const Elective = require("../models/elective");

module.exports.electiveDetails = async (req, res) => {
  const { id } = req.params;
  const elective = await Elective.findById(id).populate({
    path: "reviews",
    populate: { path: "author" },
  });
  res.render("electives/details", { elective });
};
