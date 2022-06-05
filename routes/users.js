const express = require("express");
const router = express.Router();

const { asyncHandler } = require("../middleware/async-handler");
const userController = require("../controllers/usersController");
const { User, Course } = require("../models");

const { authenticateUser } = require("../middleware/auth-user");

// Returns 200 - Returns all properties for current user
router.get(
  "/",
  authenticateUser,
  asyncHandler(async (req, res) => {
    const user = req.currentUser;
    res.status(200).json(req.currentUser);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    try {
      await User.create(req.body);
      res.status(201).location("/");
    } catch (error) {
      console.error(error);
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

module.exports = router;
