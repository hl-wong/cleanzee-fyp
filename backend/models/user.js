const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  verified: Boolean,
  address: [
    {
      label: String,
      fullName: String,
      phoneNo: String,
      street: String,
      city: String,
      postcode: String,
      state: String,
      isDefault: Boolean,
    },
  ],
  profilePicture: String,
  phoneNo: String,
  searchHistory: [String],
  joinedAt: Date,
});

module.exports = mongoose.model("User", UserSchema);
