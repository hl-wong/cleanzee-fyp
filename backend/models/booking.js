const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: String,
  cleanerId: String,
  cleanerServiceId: String,
  address: {
    fullName: String,
    phoneNo: String,
    street: String,
    city: String,
    postcode: String,
    state: String,
  },
  date: String,
  time: String,
  total: Number,
  bookingStatus: String,
  currentStatus: String,
  promoCode: String,
  discountType: String,
  percentage: Number,
  amount: Number,
  subtotal: Number,
  fee: Number,
  paymentMethod: String,
  remainingBalance: Number,
  isRated: Boolean,
  isReleased: Boolean,
  createdAt: Date,
});

module.exports = mongoose.model("Booking", bookingSchema);
