const mongoose = require("mongoose");

const AdvertisementSchema = new mongoose.Schema({
  adverPopUpImage: String,
  adverBannerImage: String,
  adverTitle: String,
  adverDesc: String,
  adverStart: Date,
  adverEnd: Date,
  discountType: String,
  percentage: Number,
  amount: String,
  promoCode: String,
  adverStatus: Boolean,
  usedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Advertisement", AdvertisementSchema);
