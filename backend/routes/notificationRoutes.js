const express = require("express");
const {
  getUserNotifications,
  getCleanerNotifications,
} = require("../controllers/notificationController");
const router = express.Router();

router.get("/:userId", getUserNotifications);
router.post("/get-cleaner-notifications", getCleanerNotifications);

module.exports = router;
