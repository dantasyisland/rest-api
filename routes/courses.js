const express = require("express");
const router = express.Router();

module.exports = router;

const { asyncHandler } = require("../middleware/async-handler");
const { Course } = require("../models");

const { authenticateUser } = require("../middleware/auth-user");
const {
  getCourses,
  createCourse,
  updateCourse,
} = require("../controllers/coursesController");

// GET Route for Courses
router.get("/", getCourses);

// POST Route for Courses
router.post("/", authenticateUser, createCourse);

// PUT Route for Courses

router.put("/:id", authenticateUser, updateCourse);

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

router.delete(
  "/:id",
  authenticateUser,
  asyncHandler(async (req, res) => {
    let course;
    try {
      course = await Course.findByPk(req.params.id);
      await course.destroy();
      res.sendStatus(204);
    } catch {}
  })
);
