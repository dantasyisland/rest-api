const { User, Course } = require("../models/");

function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

// returns one user -
const getUser = asyncHandler(async (req, res) => {});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll();
  console.log(users.every((user) => user instanceof User));
  console.log("All users:", JSON.stringify(users, null, 2));
});

module.exports = {
  getUsers,
};
