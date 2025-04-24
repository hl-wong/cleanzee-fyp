const express = require("express");
const {
  sendOTP,
  verifyOTP,
  registerUser,
  resendOTP,
  forgotPassword,
  resetPassword,
  login,
} = require("../controllers/authController");
const router = express.Router();

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/register", registerUser);
router.post("/resend-otp", resendOTP);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/login", login);

module.exports = router;
