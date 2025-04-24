const User = require("../models/user");
const {
  generateOTP,
  sendOTPToUser,
  generateHashedPassword,
  comparePassword,
} = require("../utils/authUtils");
const OTP = require("../models/otp");
const jwt = require("jsonwebtoken");
const Cleaner = require("../models/cleaner");
const Admin = require("../models/admin");

exports.sendOTP = async (req, res) => {
  const { email } = req.body;

  const registeredUser = await User.findOne({ email: email });
  if (registeredUser) {
    return res.status(409).json({ error: "Email has registered" });
  }

  const getOTP = generateOTP();

  try {
    await sendOTPToUser(email, getOTP);

    await OTP.deleteMany({ email: email });

    await OTP.create({
      email: email,
      otp: getOTP,
    });

    return res.status(200).json({ message: "OTP have sent" });
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.verifyOTP = async (req, res) => {
  const { email, enteredOTP } = req.body;

  const findOTP = await OTP.findOne({ email: email, otp: enteredOTP });
  if (!findOTP) {
    return res.status(400).json({ error: "You have entered the wrong OTP" });
  }

  try {
    await OTP.deleteOne({ email: email });

    return res.status(200).json({ message: "OTP verified" });
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const hashedPassword = await generateHashedPassword(password);

  try {
    await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });

    return res.status(200).json({ message: "User is registered" });
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.resendOTP = async (req, res) => {
  const { email } = req.body;

  const newOTP = generateOTP();

  try {
    await sendOTPToUser(email, newOTP);

    await OTP.deleteMany({ email: email });

    await OTP.create({
      email: email,
      otp: newOTP,
    });

    return res.status(200).json({ message: "OTP have resent" });
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    return res.status(404).json({ error: "Email is not registered" });
  }

  const getOTP = generateOTP();

  try {
    await sendOTPToUser(email, getOTP);

    await OTP.deleteMany({ email: email });

    await OTP.create({
      email: email,
      otp: getOTP,
    });

    return res.status(200).json({ message: "OTP have sent" });
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  const findUser = await User.findOne({ email: email });
  const oldPassword = findUser.password;

  const isMatch = await comparePassword(newPassword, oldPassword);
  if (isMatch) {
    return res
      .status(400)
      .json({ error: "Cannot use old password for new password" });
  }

  const hashedPassword = await generateHashedPassword(newPassword);

  try {
    await User.findOneAndUpdate({
      email: email,
      $set: { password: hashedPassword },
      new: true,
    });

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (e) {
    return res.status(500).send({ error: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Email and password are required to log in" });
  }

  let findUser = null;
  if (role === "Admin") {
    findUser = await Admin.findOne({ email: email });
  } else {
    findUser = await User.findOne({ email: email });
  }

  if (!findUser) {
    return res.status(400).json({ error: "Invalid email" });
  }

  const isMatch = await comparePassword(password, findUser.password);
  if (!isMatch) {
    return res.status(400).json({ error: "Incorrect password" });
  }

  if (role === "Cleaner") {
    const findCleaner = await Cleaner.findOne({ userId: findUser._id });
    if (!findCleaner) {
      return res
        .status(403)
        .json({ error: "You are not registered as a Cleaner" });
    }

    if (!findCleaner.approved) {
      return res
        .status(403)
        .json({ error: "Your account is not approved yet" });
    }
  }

  try {
    const token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET);

    return res.status(200).json({ token, user: findUser });
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
