const { Course, User } = require("../models/");
const auth = require("basic-auth");
const { asyncHandler } = require("../middleware/async-handler");

const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: [
      {
        model: User,
        as: "user",
        attributes: ["firstName", "lastName"],
      },
    ],
  });
  res.status(200).json({
    courses,
  });
});

const getCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id, {
    include: [
      {
        model: User,
        as: "user",
        attributes: { exclude: ["password"] },
      },
    ],
  });
  res.status(200).json({ course });
});

const createCourse = asyncHandler(async (req, res) => {
  try {
    await Course.create(req.body);
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
});

const updateCourse = asyncHandler(async (req, res) => {
  console.dir(req.params);
  try {
    const course = await Course.findByPk(req.params.id);
    console.dir(course.userId);
    if (course) {
      if (course.userId === req.params.id) {
        await course.update(req.body);
        res.sendStatus(204);
      } else {
        res.sendStatus(401);
      }
    }
  } catch (error) {}
});

const deleteCourse = asyncHandler(async (req, res) => {
  let credentials = auth(req);
  let course;
  try {
    const course = await Course.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "user",
          attributes: { exclude: ["password"] },
        },
      ],
    });
    if (course) {
      if (course.User.emailAddress === credentials.name) {
        await course.destroy();
        res.sendStatus(204);
      } else {
        res.sendStatus(401);
      }
    }
  } catch {}
});

// Module Exports
module.exports = {
  getCourses,
  createCourse,
  updateCourse,
  getCourse,
  deleteCourse,
};
