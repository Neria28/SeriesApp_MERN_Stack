const mongoose = require("mongoose");

const seriesSchema = mongoose.Schema({
  name: { type: String, required: true },
  premiered: { type: String, required: true },
  genres: { type: [String], required: true },
  img: { type: String, required: true },
});

module.exports = mongoose.model("series", seriesSchema);
