const { response } = require("express");
const { StatusCodes } = require("http-status-codes");
const {
  putDynamodbItem,
  getDynamodbItem,
} = require("../../utils/dynamodbManager");

async function registerUser(req, res = response) {
  const { user } = req.body.data;

  const queryGet = {
    TableName: process.env.USERS_TABLE,
    KeyConditionExpression: "#username = :username",
    ScanIndexForward: false,
    ExpressionAttributeNames: {
      "#username": "username",
    },
    ExpressionAttributeValues: {
      ":username": String(user.user),
    },
  };

  const queryPut = {
    Item: {
      username: String(user.user),
      email: String(user.email),
      password: String(user.password),
      favRepos: null,
    },
    ReturnConsumedCapacity: "TOTAL",
    TableName: process.env.USERS_TABLE,
  };

  getDynamodbItem(queryGet)
    .then((response) => {
      const { Items } = response;

      if (Items.length > 0) throw Error;

      putDynamodbItem(queryPut)
        .then((response) => {
          return res.status(StatusCodes.OK).json({ data: response });
        })
        .catch((error) => {
          console.log("Error putting users: ", { ...error });
          return res.status(error.statusCode).json({ error: error.error });
        });
    })
    .catch((error) => {
      return res.status(error.statusCode).json({ error: error.error });
    });
}

async function authUser(req, res = response) {
  const { user } = req.body.data;

  const query = {
    TableName: process.env.USERS_TABLE,
    KeyConditionExpression: "#username = :username",
    ScanIndexForward: false,
    ExpressionAttributeNames: {
      "#username": "username",
    },
    ExpressionAttributeValues: {
      ":username": String(user.user),
    },
  };

  getDynamodbItem(query)
    .then((response) => {
      const { Items } = response;

      const dbUserCredentials = Items[0].password;

      if (dbUserCredentials !== user.password) throw Error;

      return res
        .status(StatusCodes.OK)
        .json({ data: { user: Items[0].username, isAuthenticated: true } });
    })
    .catch((error) => {
      console.log("Error getting notifications: ", { ...error });
      return res.status(error.statusCode).json({ error: error.error });
    });
}

module.exports = { registerUser, authUser };
