const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1" });

function putDynamodbItem(params) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  return new Promise((resolve, reject) => {
    dynamoDb.put(params, function (error, data) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(params);
      }
    });
  });
}

function getDynamodbItem(params) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  return new Promise((resolve, reject) => {
    dynamoDb.query(params, function (error, data) {
      if (error) {
        console.log("Error", error);
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

function scanDynamodbTable(params) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  return new Promise((resolve, reject) => {
    dynamoDb.scan(params, function (error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

function updateDynamodbItem(params) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  return new Promise((resolve, reject) => {
    dynamoDb.update(params, function (error, data) {
      if (error) {
        console.log("Error", error);
        reject(false);
      } else {
        console.log("dynamodb record updated: ", data);
        resolve(true);
      }
    });
  });
}

module.exports = {
  putDynamodbItem,
  getDynamodbItem,
  updateDynamodbItem,
  scanDynamodbTable,
};
