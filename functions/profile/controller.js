const { response } = require("express");
const { StatusCodes } = require("http-status-codes");
const {
  getDynamodbItem,
  updateDynamodbItem,
} = require("../../utils/dynamodbManager");
const { getRequest } = require("../../utils/requetsManager");
const parseGithubResponse = require("./parser");

async function getRepositories(req, res = response) {
  try {
    const { user } = req.body.data;

    const request = { url: `${process.env.GITHUB_API}/users/${user}/repos` };
    const repositoriesResponse = await getRequest(request);

    const query = {
      TableName: process.env.USERS_TABLE,
      KeyConditionExpression: "#username = :username",
      ScanIndexForward: false,
      ExpressionAttributeNames: {
        "#username": "username",
      },
      ExpressionAttributeValues: {
        ":username": String(user),
      },
    };

    getDynamodbItem(query)
      .then((response) => {
        const { Items } = response;

        if (Items.length !== 1) throw Error;

        const { favRepos } = Items[0];
        const parserResponse = parseGithubResponse(
          repositoriesResponse,
          favRepos
        );

        return res.status(StatusCodes.OK).json({ data: parserResponse });
      })
      .catch((error) => {
        return res.status(error.statusCode).json({ error: error.error });
      });
  } catch (error) {
    console.log("Error getting data from github: ", error);
    res.status(error.statusCode).json({ error: error.error });
  }
}

async function saveRepositories(req, res = response) {
  const { user, favRepos } = req.body.data;

  const queryGet = {
    TableName: process.env.USERS_TABLE,
    KeyConditionExpression: "#username = :username",
    ScanIndexForward: false,
    ExpressionAttributeNames: {
      "#username": "username",
    },
    ExpressionAttributeValues: {
      ":username": String(user),
    },
  };

  const queryUpdate = {
    TableName: process.env.USERS_TABLE,
    ScanIndexForward: false,
    Key: {
      username: user,
      email: "",
    },
    UpdateExpression: "set favRepos = :favRepos",
    ExpressionAttributeValues: {
      ":favRepos": favRepos,
    },
  };

  getDynamodbItem(queryGet)
    .then((response) => {
      const { Items } = response;

      if (Items.length !== 1) throw Error;

      queryUpdate.Key.email = Items[0].email;

      updateDynamodbItem(queryUpdate)
        .then((response) => {
          return res.status(StatusCodes.OK).json({ data: response });
        })
        .catch((error) => {
          console.log("Error getting data from refer: ", error);
          res.status(error.statusCode).json({ error: error.error });
        });
    })
    .catch((error) => {
      return res.status(error.statusCode).json({ error: error.error });
    });
}

module.exports = { saveRepositories, getRepositories };
