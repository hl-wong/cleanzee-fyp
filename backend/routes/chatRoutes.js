const express = require("express");
const router = express.Router();
const { checkExistChat, getChats } = require("../controllers/chatController");

router.get("/check-exist-chat", checkExistChat);
router.get("/:id/:role", getChats);

module.exports = router;
