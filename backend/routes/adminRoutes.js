const express = require("express");
const {
  getAdminOverview,
  getPendingCleaners,
  approveCleaner,
  rejectCleaner,
  createNewAdvertisement,
  updateAdvertisement,
  deleteAdvertisement,
  getAdvertisements,
  createNewService,
  updateService,
  deleteService,
  getServices,
  getBookings,
} = require("../controllers/adminController");
const router = express.Router();

router.get("/get-overview", getAdminOverview);
router.get("/get-pending-cleaners", getPendingCleaners);
router.post("/approve-cleaner", approveCleaner);
router.post("/reject-cleaner", rejectCleaner);
router.post("/create-new-advertisement", createNewAdvertisement);
router.post("/update-advertisement", updateAdvertisement);
router.post("/delete-advertisement", deleteAdvertisement);
router.get("/get-advertisements", getAdvertisements);
router.post("/create-new-service", createNewService);
router.post("/update-service", updateService);
router.post("/delete-service", deleteService);
router.get("/get-services", getServices);
router.get("/get-bookings", getBookings);

module.exports = router;
