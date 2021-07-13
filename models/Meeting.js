const mongoose = require("mongoose");

var meetingSchema = mongoose.Schema({
  mid: String,
  mpassword: String,
  mchat: [
    {
      user: String,
      message: String,
      timestamp: Date,
    },
  ],
});

module.exports = mongoose.model("Meeting", meetingSchema);
