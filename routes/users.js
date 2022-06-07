const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/auth-user");
const { getUser, createUser } = require("../controllers/usersController");

router.get("/", authenticateUser, getUser).post("/", createUser);

module.exports = router;
