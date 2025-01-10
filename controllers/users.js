const User = require("../models/user");
const mongoose = require("mongoose");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: err.message });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
        res.status(400).send({ message: "Invalid user ID" });
      } else {
        res.status(404).send({ message: "User ID not found" });
      }
      res.status(500).send({ message: err.message });
    });
};

module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      const status = err.status;
      console.log(status);
      if (err.name === "ValidationError") {
        res.status(400).send({ message: err.message, status });
      }
      res.status(500).send({ message: err.message });
    });
};
