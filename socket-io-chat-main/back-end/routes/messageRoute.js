const express = require("express");

const {
  getMessages,
  createMessage,
} = require("../controller/messageController");

const router = express.Router();

// CREATE MESSAGE
router.post("/", createMessage);

// GET MESSAGES
router.get("/:chatId", getMessages);

module.exports = router;
