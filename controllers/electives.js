const Elective = require("../models/elective");

module.exports.electiveDetails = async (req, res) => {
  const { id } = req.params;
  const elective = await Elective.findById(id);
  res.render("electives/details", { elective });
};
