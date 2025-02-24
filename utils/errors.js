// const BAD_REQUEST = 400;
// const UNAUTHORIZED = 401;
// const FORBIDDEN = 403;
// const NOT_FOUND = 404;
// const CONFLICT = 409;
const DEFAULT = 500;

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}
class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}
class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}
module.exports = {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  DEFAULT,
};

// module.exports = {
//   BAD_REQUEST,
//   UNAUTHORIZED,
//   FORBIDDEN,
//   NOT_FOUND,
//   CONFLICT,
//   DEFAULT,
// };
