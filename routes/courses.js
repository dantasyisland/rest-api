const express = require("express");
const router = express.Router();

module.exports = router;

const { asyncHandler } = require("../middleware/async-handler");
const { User, Course } = require("../models");

const { authenticateUser } = require("../middleware/auth-user");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const courses = await Course.findAll({
      include: [
        {
          model: User,
          as: "user",
        },
      ],
    });

    res.json({
      courses,
    });
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    try {
      await Course.create(req.body);
      res.status(201).json({ message: "Course successfully created" });
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

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "user",
        },
      ],
    });
    res.json({ course });
  })
);
