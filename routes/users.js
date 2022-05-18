const express = require("express");
const router = express.Router();

const userController = require("../controllers/usersController");

module.exports = router;

router.get("/", (req, res) => {
  const users = userController.getUsers();
  res.send("check log");
});
