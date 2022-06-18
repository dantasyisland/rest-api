"use strict";

// load modules
const express = require("express");
const morgan = require("morgan");
const { Sequelize } = require("sequelize");

// variable to enable global error logging
const enableGlobalErrorLogging =
  process.env.ENABLE_GLOBAL_ERROR_LOGGING === "true";

// create the Express app
const app = express();

app.use(express.json()); //Used to parse JSON bodies

// setup morgan
app.use(morgan("dev"));

// setup Sequelize
const db = require("./models/index");
const user = require("./models/user");

// Test connection to database
(async () => {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync();
    console.log("Successfully connected to database!");
  } catch (error) {
    error.message = "Cannot connect to Database";
    console.error(error);
  }
})();

// Routes
const users = require("./routes/users");
const courses = require("./routes/courses");

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the REST API project!",
  });
});

// /api/users routes
app.use("/api/users", users);

// /api/courses routes
app.use("/api/courses", courses);

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found",
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set port to 5000
app.set("port", process.env.PORT || 5000);

// listen on port
const server = app.listen(app.get("port"), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
