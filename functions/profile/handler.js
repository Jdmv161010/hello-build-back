const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");

// Creating express server
const app = express();
// API routes
const api = require("./routes.js");
// Setting cors
app.use(cors({ origin: process.env.CORS_ORIGIN }));
// Reading and parsing request body
app.use(express.json());
// Lambda routes
app.use("/v1/profile", api);

module.exports.profile = serverless(app);
