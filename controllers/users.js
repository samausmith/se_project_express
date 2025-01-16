const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const User = require("../models/user");

const errorHandler = require("../utils/errorHandler");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      errorHandler({ err, res });
    });
};

module.exports.getCurrentUser = (req, res) => {
  User.findById(req.user)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      errorHandler({ err, res });
    });
};

module.exports.updateUserProfile = (req, res) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      errorHandler({ err, res });
    });
};

module.exports.createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        return Promise.reject(
          new Error({
            name: "ConflictError",
            message: "Email is already registered as user",
          })
        );
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) =>
      res.status(201).send({ name, avatar, email, _id: user._id })
    )
    .catch((err) => {
      errorHandler({ err, res });
    });
};

module.exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      errorHandler({ err, res });
    });
};
