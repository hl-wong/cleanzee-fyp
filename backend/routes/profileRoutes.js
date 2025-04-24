const express = require("express");
const {
  changePassword,
  registerAsCleaner,
  addNewAddress,
  updateAddress,
  deleteAddress,
  updateProfilePicture,
  updateProfile,
  deleteAccount,
} = require("../controllers/profileController");
const router = express.Router();

router.post("/change-password", changePassword);
router.post("/register-as-cleaner", registerAsCleaner);
router.post("/update-profile-picture", updateProfilePicture);
router.post("/update-profile", updateProfile);
router.post("/add-new-address", addNewAddress);
router.post("/update-address", updateAddress);
router.post("/delete-address", deleteAddress);
router.post("/delete-account", deleteAccount);

module.exports = router;
