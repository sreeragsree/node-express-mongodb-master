module.exports = app => {
  const register = require("../controllers/register.controller.js");

  var router = require("express").Router();

  // Create a new user
  router.post("/", register.create);

  // Retrieve all users
  router.get("/", register.findAll);

  // Retrieve all Active users
  router.get("/activated", register.findAllPublished);

  // Retrieve a single user with id
  router.get("/:id", register.findOne);

  // Update a user with id
  router.put("/:id", register.update);

  // Delete a user with id
  router.delete("/:id", register.delete);

  // Create a new user
  router.delete("/", register.deleteAll);

  app.use("/api/event", router);
};
