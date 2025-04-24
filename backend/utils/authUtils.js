const nodemailer = require("nodemailer");
require("dotenv").config();
const bcrypt = require("bcryptjs");

const transporter = nodemailer.createTransport({
  service: "yahoo",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOTPToUser = async (email, otp) => {
  console.log(email, otp);
  const mailOptions = {
    from: '"Cleanzee" <' + process.env.EMAIL_USER + ">",
    to: email,
    subject: "Cleanzee Registration Verification Code",
    text: `Your OTP Code is ${otp}`,
    html: `<p>Your registration verification code <b>${otp}</b></p>`,
  };

  await transporter.sendMail(mailOptions);
};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const generateHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const comparePassword = async (enteredPassword, storedPassword) => {
  return await bcrypt.compare(enteredPassword, storedPassword);
};

module.exports = {
  sendOTPToUser,
  generateOTP,
  generateHashedPassword,
  comparePassword,
};
