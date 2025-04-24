const mongoose = require("mongoose");

const CleanerSchema = new mongoose.Schema({
  userId: String,
  fullName: String,
  icNumber: String,
  image: String,
  approved: Boolean,
  phoneNo: String,
  address: {
    street: String,
    city: String,
    postcode: String,
    state: String,
  },
  agreeToTerms: Boolean,
  joinedAt: Date,
  availability: [
    {
      day: String,
      startTime: String,
      endTime: String,
      off: Boolean,
    },
  ],
  reviews: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      userRating: Number,
      userReview: String,
      createdAt: Date,
    },
  ],
  balance: Number,
  transactions: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      createdAt: Date,
      finalAmount: Number,
    },
  ],
});

module.exports = mongoose.model("Cleaner", CleanerSchema);
