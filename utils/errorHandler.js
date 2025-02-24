const {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  DEFAULT,
} = require("./errors");

// const errorHandler = ({ err, res }) => {
//   if (err.name === "ValidationError") {
//     res.status(BAD_REQUEST).send({ message: err.message });
//   } else if (err.name === "CastError") {
//     res.status(BAD_REQUEST).send({ message: "Invalid ID" });
//   } else if (err.name === "AuthorizationError") {
//     res.status(UNAUTHORIZED).send({ message: "Invalid credentials" });
//   } else if (err.name === "ForbiddenError") {
//     res.status(FORBIDDEN).send({ message: err.message });
//   } else if (err.name === "DocumentNotFoundError") {
//     res.status(NOT_FOUND).send({ message: "ID not found" });
//   } else if (err.name === "ConflictError") {
//     res.status(CONFLICT).send({ message: err.message });
//   } else {
//     res.status(DEFAULT).send({ message: err.message });
//   }
// };

const errorHandler = ({ err, res }) => {
  if (err.name === "ValidationError") {
    next(new BadRequestError(err.message));
  } else if (err.name === "CastError") {
    next(new BadRequestError("The id string is in an invalid format"));
  } else if (err.name === "AuthorizationError") {
    next(new UnauthorizedError("The id string is in an invalid format"));
  } else if (err.name === "ForbiddenError") {
    next(new ForbiddenError("The id string is in an invalid format"));
  } else if (err.name === "DocumentNotFoundError") {
    next(new NotFoundError("The id string is in an invalid format"));
  } else if (err.name === "ConflictError") {
    next(new ConflictError("The id string is in an invalid format"));
  } else {
    res.status(DEFAULT).send({ message: err.message });
  }
};

module.exports = errorHandler;
