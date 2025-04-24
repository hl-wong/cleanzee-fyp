const express = require("express");
const {
  getUserData,
  getCleanerData,
  getActiveAdvertisements,
  searchServices,
  getRandomServices,
  getServiceCategory,
} = require("../controllers/userController");
const router = express.Router();

router.get("/:id", getUserData);
router.get("/cleaner/:id", getCleanerData);
router.post("/get-active-advertisements", getActiveAdvertisements);
router.post("/search-services", searchServices);
router.post("/get-random-services", getRandomServices);
router.post("/get-service-category", getServiceCategory);

module.exports = router;
