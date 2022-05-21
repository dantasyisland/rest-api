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
