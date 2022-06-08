const { Course, User } = require("../models/");
const auth = require("basic-auth");

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
  res.json({ course });
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
