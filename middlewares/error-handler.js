const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.send({ message: err.message });
};

module.exports = { errorHandler };
