const {
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  DEFAULT,
} = require("./errors");

const errorHandler = ({ err, res }) => {
  // console.error(err);
  // console.error({ name: err.name });
  if (err.name === "ValidationError") {
    res.status(BAD_REQUEST).send({ message: err.message });
  } else if (err.name === "CastError") {
    res.status(BAD_REQUEST).send({ message: "Invalid ID" });
  } else if (err.name === "Error") {
    res.status(BAD_REQUEST).send({ message: err.message });
  } else if (err.name === "AuthorizationError") {
    res.status(UNAUTHORIZED).send({ message: "Invalid credentials" });
  } else if (err.name === "ForbiddenError") {
    res.status(FORBIDDEN).send({ message: err.message });
  } else if (err.name === "DocumentNotFoundError") {
    res.status(NOT_FOUND).send({ message: "ID not found" });
  } else if (err.name === "ConflictError") {
    res.status(CONFLICT).send({ message: err.message });
  } else {
    res.status(DEFAULT).send({ message: err.message });
  }
};

module.exports = errorHandler;
