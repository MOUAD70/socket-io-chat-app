const express = require("express");
const { registerUser, loginUser, findUser, getUsers } = require("../controller/userController");

const router = express.Router();

// REGISTER ROUTE
router.post("/register", registerUser);

// LOGIN ROUTE
router.post("/login", loginUser)

// FIND USER ROUTE
router.get("/find/:userId", findUser)

// GET USERS ROUTE
router.get("/", getUsers)

module.exports = router;
