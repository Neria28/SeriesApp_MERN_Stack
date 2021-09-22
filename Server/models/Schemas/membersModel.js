const mongoose = require("mongoose");

const membersSchema = mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  city: { type: String, required: true },
});

module.exports = mongoose.model("members", membersSchema);
