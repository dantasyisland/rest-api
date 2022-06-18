const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/auth-user");

// Controller functions for http methods
const {
  getCourses,
  createCourse,
  updateCourse,
  getCourse,
  deleteCourse,
} = require("../controllers/coursesController");

// GET Route for Courses
router.get("/", getCourses);

// POST Route for Courses - protected
router.post("/", authenticateUser, createCourse);

// GET Route for Course
router.get("/:id", getCourse);

// PUT Route for Courses - protected
router.put("/:id", authenticateUser, updateCourse);

// DELETE Route for Course - protected
router.delete("/:id", authenticateUser, deleteCourse);

// Module Exports
module.exports = router;
