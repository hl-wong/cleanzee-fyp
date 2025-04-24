const express = require("express");
const { getNearbyCleaners } = require("../controllers/nearbyController");
const router = express.Router();

router.post("/nearby-cleaners", getNearbyCleaners);

module.exports = router;
