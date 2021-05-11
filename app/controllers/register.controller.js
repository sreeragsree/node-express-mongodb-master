const db = require("../models");
const Registration = db.register;

// Create and Save a new user
exports.create = (req, res) => {

  var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  var numberpattern=/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
  var validmob=numberpattern.test(req.body.mobile);
  var valid = emailRegex.test(req.body.email);
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Name can not be empty!" });
    return;
  }
  else if(!req.body.email){
    res.status(400).send({ message: "Email-field can not be empty!" });
    return;
  }
  else if(!valid){
    res.status(400).send({ message: "Invalid Email Syntax / Id" });
    return;
  }
  else if(!req.body.mobile){
    res.status(400).send({ message: "Phone can not be empty!" });
    return;
  }
  else if(!validmob){
    res.status(400).send({ message: "Please Enter a 10-digit mobile number" });
    return;
  }


 
  // Create a user
  const register = new Registration({
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    published: req.body.published ? req.body.published : false
  });

  // Save Tutorial in the database
  register
    .save(register)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Registration.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ."
      });
    });
};

// Find a single user with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Registration.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found user with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving user with id=" + id });
    });
};

// Update a user by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Registration.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with id=${id}. Maybe user was not found!`
        });
      } else res.send({ message: "user details was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating user with id=" + id
      });
    });
};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete user with id=${id}. Maybe Tutorial was not found!`
        });
      } else {
        res.send({
          message: "user deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete users with id=" + id
      });
    });
};

// Delete all Registered users from the database.
exports.deleteAll = (req, res) => {
  Registration.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} All users  deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    });
};

// Find all val pub
exports.findAllPublished = (req, res) => {
  Registration.find({ activated: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ."
      });
    });
};
