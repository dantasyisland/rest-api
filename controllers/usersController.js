const { User } = require("../models/");
const { asyncHandler } = require("../middleware/async-handler");

// Will return current user if authenticated
const getUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findByPk(req.currentUser.id, {
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });
    res.status(200).json({
      user,
    });
  } catch (error) {
    console.error(error);
    const errors = error.errors.map((err) => err.message);
    res.status(500).json({ errors });
  }
});

// Will create a new user
const createUser = asyncHandler(async (req, res) => {
  try {
    await User.create(req.body);
    res.location("/").status(201).end();
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

module.exports = {
  getUser,
  createUser,
};
