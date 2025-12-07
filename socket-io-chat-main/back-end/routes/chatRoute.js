const express = require("express");
const {
  createChat,
  findUserChats,
  findChat,
} = require("../controller/chatController");

const router = express.Router();

// CREATE CHAT
router.post("/", createChat);

// FIND USER CHATS
router.get("/:userId", findUserChats);

// FIND USER CHAT
router.get("/find/:firstId/:secondId", findChat);

module.exports = router;
