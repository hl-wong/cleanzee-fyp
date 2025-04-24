const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  senderId: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const ChatSchema = new mongoose.Schema(
  {
    senderId: String,
    receiverId: String,
    messages: [MessageSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", ChatSchema);
