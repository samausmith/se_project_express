const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UNAUTHORIZED } = require("../utils/errors");

const handleAuthError = (res) => {
  res.status(UNAUTHORIZED).send({ message: "Authorization error" });
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError(res, req);
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleAuthError(res, req);
  }

  req.user = payload; // adding the payload to the Request object

  return next(); // passing the request further along
};
