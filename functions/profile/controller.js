const { response } = require("express");
const { StatusCodes } = require("http-status-codes");
const { getRequest } = require("../../utils/requetsManager");
const parserRepositoriesResponse = require("./parser");

async function getRepositories(req, res = response) {
  try {
    const { user } = req.body.data;

    const request = { url: `${process.env.GITHUB_API}/users/${user}/repos` };
    const repositoriesResponse = await getRequest(request);

    const parserResponse = parserRepositoriesResponse(repositoriesResponse);

    res.status(StatusCodes.OK).json({ data: parserResponse });
  } catch (error) {
    console.log("Error getting data from refer: ", error);
    res.status(error.statusCode).json({ error: error.error });
  }
}

module.exports = getRepositories;
