"use strict";

const auth = require("basic-auth");
const { User } = require("../models");
const bcrypt = require("bcrypt");

/**
 * Middleware to authenticate the request using Basic Authentication
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {Function} next - The function to call to pass execution to the next middleware.
 */

exports.authenticateUser = async (req, res, next) => {
  let message;
  const credentials = auth(req);

  if (credentials) {
    const user = await User.findOne({
      where: { emailAddress: credentials.name },
    });
    console.log(JSON.stringify(user, null, 2));
    if (user) {
      const authenticated = bcrypt.compareSync(credentials.pass, user.password);

      if (authenticated) {
        console.log(
          `Authentication successful for username: ${user.emailAddress}`
        );
        req.currentUser = user;
      } else {
        message = `Authentication failure for username: ${user.emailAddress}`;
      }
    } else {
      message = `User not found for username: ${credentials.name}`;
    }
  } else {
    message = "Auth header not found";
  }

  if (message) {
    console.warn(message);
    res.status(401).json({ message: "Access Denied" });
  } else {
    next();
  }
};
