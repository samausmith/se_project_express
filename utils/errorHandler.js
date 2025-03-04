const { DEFAULT } = require("./errors");

const errorHandler = ({ err, req, res, next }) => {
  const statusCode = err.statusCode || DEFAULT;
  const message =
    statusCode === DEFAULT
      ? "An error has occured on the server."
      : err.message;
  res.status(statusCode).send({ message });
};

module.exports = errorHandler;
