const express = require("express");
const {
  setAvailability,
  assignService,
  getAssignServices,
  updateAssignService,
  deleteAssignService,
  getAdminServices,
  getBookingStatus,
} = require("../controllers/cleanerController");
const router = express.Router();

router.post("/set-availability", setAvailability);
router.post("/assign-service", assignService);
router.get("/:cleanerId", getAssignServices);
router.post("/update-assign-service", updateAssignService);
router.post("/delete-assign-service", deleteAssignService);
router.post("/get-admin-services", getAdminServices);
router.post("/get-booking-status", getBookingStatus);

module.exports = router;
