const { Course, User } = require("../models/");

function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.findAll({
    include: [
      {
        model: User,
        as: "user",
        attributes: { exclude: ["password"] },
      },
    ],
  });

  res.status(200).json({
    courses,
  });
});

const createCourse = asyncHandler(async (req, res) => {
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
});

const updateCourse = asyncHandler(async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (course) {
      console.log(course);
      await course.update(req.body);
    }
    console.log(req.body);
    res.sendStatus(204);
  } catch (error) {}
});

module.exports = { getCourses, createCourse, updateCourse };
