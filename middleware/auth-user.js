"use strict";

const { User } = require("../models");
const auth = require("basic-auth");
const bcrypt = require("bcrypt");

// Function to authenticate the user
exports.authenticateUser = async (req, res, next) => {
  let message;
  const credentials = auth(req);

  // Checks if credentials exist and if so checks against database to see if user exists
  if (credentials) {
    const user = await User.findOne({
      where: { emailAddress: credentials.name },
    });
    console.log(JSON.stringify(user, null, 2));

    // If user exists password is checked against database
    if (user) {
      const authenticated = bcrypt.compareSync(credentials.pass, user.password);
      // Allows the request to go forward with authenticated user
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
  // response if user is not authenticated
  if (message) {
    console.warn(message);
    res.status(401).json({ message: "Access Denied" });
  } else {
    next();
  }
};
