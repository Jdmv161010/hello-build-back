const { StatusCodes } = require("http-status-codes");

class ErrorHandler extends Error {
  constructor(statusCode, error) {
    super();
    this.statusCode = statusCode;
    this.error = error;
  }
}

module.exports = {
  ErrorHandler,
};
