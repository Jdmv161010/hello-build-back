const Axios = require("axios");
const { StatusCodes } = require("http-status-codes");
const { ErrorHandler } = require("../middlewares/errorHandlerMiddleware");

const axios = Axios.create({
  timeout: 25000,
});

const postRequest = (request) => {
  const { url, data, headers } = request;
  return axios
    .post(url, data, {
      ...headers,
      "Content-Type": "application/json",
      "Cache-control": "no-cache",
    })
    .then((response) => {
      if (response.status === StatusCodes.OK) {
        return response.data;
      }
    })
    .catch((error) => {
      console.log("postRequest", error);
      throw new ErrorHandler(
        StatusCodes.SERVICE_UNAVAILABLE,
        "External service unavailable"
      );
    });
};

const getRequest = (request) => {
  const { url } = request;
  return axios
    .get(url)
    .then((response) => {
      if (response.status === StatusCodes.OK) {
        return response.data;
      }
    })
    .catch((error) => {
      console.log("getRequest", error);
      throw new ErrorHandler(
        StatusCodes.SERVICE_UNAVAILABLE,
        "External service unavailable"
      );
    });
};

module.exports = {
  postRequest,
  getRequest,
};
