const mongoose = require("mongoose");

const OTPSchema = new mongoose.Schema({
  email: String,
  otp: String,
});

module.exports = mongoose.model("OTP", OTPSchema);
