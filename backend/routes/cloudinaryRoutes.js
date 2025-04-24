const express = require("express");
const { generateSignature } = require("../controllers/cloudinaryController");
const router = express.Router();

router.post("/generate-signature", generateSignature);

module.exports = router;
