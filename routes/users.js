const express = require("express");
const router = express.Router();

const { asyncHandler } = require("../middleware/async-handler");
const userController = require("../controllers/usersController");

module.exports = router;

// Middleware will go here
router.get("/", (req, res) => {
  const users = userController.getUsers();

  res.send("check log");

  // res.json({});
});
