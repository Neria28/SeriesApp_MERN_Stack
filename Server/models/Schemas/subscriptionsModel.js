const mongoose = require("mongoose");

const subsSchema = mongoose.Schema({
  seriesId: { type: String, required: true },
  memberId: { type: String, required: true },
  date: { type: String, required: true },
});

module.exports = mongoose.model("subscriptions", subsSchema);
