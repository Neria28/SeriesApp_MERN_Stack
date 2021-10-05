const mongoose = require("mongoose");

const membersSchema = mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  city: { type: String, required: false },
});

module.exports = mongoose.model("members", membersSchema);
