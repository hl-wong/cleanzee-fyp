const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  id: String,
  title: String,
  desc: String,
  isRead: Boolean,
  createdAt: Date,
});

module.exports = mongoose.model("Notification", notificationSchema);
