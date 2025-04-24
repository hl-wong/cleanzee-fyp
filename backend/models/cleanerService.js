const mongoose = require("mongoose");

const CleanerServiceSchema = new mongoose.Schema({
  userId: String,
  cleanerId: String,
  serviceId: String,
  serviceName: String,
  serviceCategory: String,
  servicePrice: String,
  timeslots: {
    type: Map,
    of: [String],
  },
  optionId: { type: String, required: false },
  reviews: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      userRating: Number,
      userReview: String,
      createdAt: Date,
    },
  ],
});

module.exports = mongoose.model("CleanerService", CleanerServiceSchema);
