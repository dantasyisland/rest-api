const express = require("express");
const router = express.Router();

const { asyncHandler } = require("../middleware/async-handler");
const userController = require("../controllers/usersController");
const { User, Course } = require("../models");

const { authenticateUser } = require("../middleware/auth-user");

// Middleware will go here
router.get(
  "/",
  authenticateUser,
  asyncHandler(async (req, res) => {
    const user = req.currentUser;
    /**
     * Add user courses
     *
     * const people = await Person.findAll({
      include: [{
        model: Movie,
        as: 'director',
      }],
    });
     */

    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress,
    });
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    try {
      await User.create(req.body);
      res.status(201).json({ message: "Account successfully created" });
      res.location("/");
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
