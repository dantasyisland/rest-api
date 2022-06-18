const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/auth-user");
const { getUser, createUser } = require("../controllers/usersController");

// GET Route For Users - protected
router.get("/", authenticateUser, getUser);

// POST Route For Users
router.post("/", createUser);

module.exports = router;
