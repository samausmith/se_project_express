const mongoose = require("mongoose");
const { BAD_REQUEST, NOT_FOUND, DEFAULT } = require("./errors");

const errorHandler = ({ err, res }) => {
  console.error(err);
  if (err.name === "ValidationError") {
    res.status(BAD_REQUEST).send({ message: err.message });
  } else if (err.name === "CastError") {
    res.status(BAD_REQUEST).send({ message: "Invalid ID" });
  } else if (err.name === "DocumentNotFoundError") {
    res.status(NOT_FOUND).send({ message: "ID not found" });
  } else {
    res.status(DEFAULT).send({ message: err.message });
  }
};

module.exports = errorHandler;
