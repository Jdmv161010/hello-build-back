const { errorHandlerMiddleware } = require("./errorHandlerMiddleware");
const { validateMiddleware } = require("./validationMiddleware");

module.exports = {
  validateMiddleware,
  errorHandlerMiddleware,
};
