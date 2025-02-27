const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const User = require("../models/user");

const errorHandler = require("../utils/errorHandler");

const { BAD_REQUEST } = require("../utils/errors");

module.exports.getCurrentUser = (req, res) => {
  User.findById(req.user)
    .orFail()
    .then((user) => res.send(user))
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
    .then((user) => res.send(user))
    .catch((err) => {
      errorHandler({ err, res });
    });
};

module.exports.createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        const error = new Error("Email is already registered as user");
        error.name = "ConflictError";
        return Promise.reject(error);
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

module.exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(BAD_REQUEST)
      .send({ message: "The password and email fields are required" });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      errorHandler({ err, res, next });
    });
};
