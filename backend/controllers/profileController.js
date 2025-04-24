const User = require("../models/user");
const {
  comparePassword,
  generateHashedPassword,
} = require("../utils/authUtils");
const mongoose = require("mongoose");
const Cleaner = require("../models/cleaner");
const Notification = require("../models/notification");
const CleanerService = require("../models/cleanerService");
const { malaysiaTime } = require("../utils/timeUtils");
const Booking = require("../models/booking");

exports.changePassword = async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  const findUser = await User.findById(userId);
  if (!findUser) {
    return res.status(404).json({ error: "User not found" });
  }

  const firstMatch = await comparePassword(currentPassword, findUser.password);
  if (!firstMatch) {
    return res.status(400).json({ error: "Incorrect current password" });
  }

  if (newPassword === currentPassword) {
    return res
      .status(400)
      .json({ error: "New password cannot be the same as current password" });
  }

  const hashedPassword = await generateHashedPassword(newPassword);

  try {
    await User.findOneAndUpdate({
      userId: userId,
      $set: { password: hashedPassword },
      new: true,
    });

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateProfilePicture = async (req, res) => {
  const { userId, imageUri } = req.body;

  if (!userId || !imageUri) {
    return res.status(400).json({ error: "Missing userId or imageUrl" });
  }

  try {
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: imageUri },
      { new: true }
    );

    if (!updateUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "Profile picture updated successfully" });
  } catch (e) {
    return res.status(500).json({ error: "Database update failed" });
  }
};

exports.updateProfile = async (req, res) => {
  const { userId, firstName, lastName, phoneNo } = req.body;

  try {
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, phoneNo },
      { new: true, runValidators: true }
    );

    if (!updateUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (e) {
    return res.status(500).json({ error: "Database update failed" });
  }
};

exports.registerAsCleaner = async (req, res) => {
  const {
    userId,
    fullName,
    phoneNo,
    address,
    icNumber,
    selfiePhoto,
    agreeToTerms,
    approved,
  } = req.body;

  const findUser = await User.findById(userId);
  if (!findUser) {
    return res.status(404).json({ error: "Cannot find the user" });
  }

  if (!findUser.phoneNo || findUser.phoneNo.trim() === "") {
    findUser.phoneNo = phoneNo;
    await findUser.save();
  }

  try {
    await Cleaner.create({
      userId: userId,
      fullName: fullName,
      phoneNo: phoneNo,
      address: address,
      icNumber: icNumber,
      image: selfiePhoto,
      agreeToTerms: agreeToTerms,
      approved: approved,
      joinedAt: malaysiaTime,
    });

    return res.status(200).json({ message: "Registered successfully!" });
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.addNewAddress = async (req, res) => {
  const {
    userId,
    label,
    fullName,
    street,
    state,
    city,
    postcode,
    phoneNo,
    isDefault,
  } = req.body;

  const findUser = await User.findById(userId);
  if (!findUser) {
    return res.status(404).json({ error: "Cannot find the user" });
  }

  const isFirstAddress = findUser.address.length === 0;

  if (isDefault && findUser.address.length > 0) {
    await User.updateOne(
      { _id: userId, "address.isDefault": true },
      { $set: { "address.$.isDefault": false } }
    );
  }

  try {
    const newAddress = {
      label,
      fullName,
      street,
      state,
      city,
      postcode,
      phoneNo,
      isDefault: isFirstAddress ? true : isDefault,
    };

    findUser.address.push(newAddress);
    await findUser.save();

    return res.status(200).json({ message: "Address added successfully" });
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateAddress = async (req, res) => {
  const {
    userId,
    addressId,
    label,
    fullName,
    street,
    state,
    city,
    postcode,
    phoneNo,
    isDefault,
  } = req.body;
  const addressObjectId = new mongoose.Types.ObjectId(addressId);

  const findUser = await User.findById(userId);
  if (!findUser) {
    return res.status(404).json({ error: "Cannot find the user" });
  }

  const addressIndex = findUser.address.findIndex((addr) =>
    addr._id.equals(addressObjectId)
  );
  if (addressIndex === -1) {
    return res.status(400).json({ error: "Address not found" });
  }

  const defaultCount = findUser.address.filter((addr) => addr.isDefault).length;

  if (
    !isDefault &&
    defaultCount === 1 &&
    findUser.address[addressIndex].isDefault
  ) {
    return res.status(400).json({
      error: "At least one address must be set as default.",
    });
  }

  if (isDefault) {
    findUser.address.forEach((addr) => (addr.isDefault = false));
  }

  try {
    Object.assign(findUser.address[addressIndex], {
      label,
      fullName,
      street,
      state,
      city,
      postcode,
      phoneNo,
      isDefault,
    });

    await findUser.save();

    return res.status(200).json({ message: "Address updated successfully" });
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteAddress = async (req, res) => {
  const { userId, addressId } = req.body;

  const addressObjectId = new mongoose.Types.ObjectId(addressId);

  const findUser = await User.findById(userId);
  if (!findUser) {
    return res.status(400).json({ error: "User not found" });
  }

  const addressIndex = findUser.address.findIndex((addr) =>
    addr._id.equals(addressObjectId)
  );
  if (addressIndex === -1) {
    return res.status(400).json({ error: "Address not found" });
  }

  if (findUser.address[addressIndex].isDefault) {
    return res.status(400).json({ error: "Cannot delete the default address" });
  }

  try {
    findUser.address.splice(addressIndex, 1);
    await findUser.save();

    return res.status(200).json({ message: "Address deleted successfully " });
  } catch (e) {
    return res.status(500).json({ error: "Error on deleting address" });
  }
};

exports.deleteAccount = async (req, res) => {
  const { userId } = req.body;

  const findUser = await User.findById(userId);
  if (!findUser) {
    return res.status(404).json({ error: "User not found" });
  }

  try {
    const findCleaner = await Cleaner.findOne({ userId: userId });
    if (findCleaner) {
      await CleanerService.deleteMany({ cleanerId: findCleaner._id });
      await Notification.deleteMany({ id: findCleaner._id });

      await Cleaner.deleteMany({ userId: userId });
    }

    await Notification.deleteMany({ id: userId });
    await User.findByIdAndDelete(userId);

    return res.status(200).json({ message: "Account deletion successful" });
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
