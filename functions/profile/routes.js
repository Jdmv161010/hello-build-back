const { Router } = require("express");
const { Validator } = require("express-json-validator-middleware");
const { getRepositories, saveRepositories } = require("./controller");
const getRepositoriesSchema = require("./schemas/getRepositoriesSchema.json");
const saveRepositoriesSchema = require("./schemas/saveRepositoriesSchema.json");

const router = Router();

const { validate } = new Validator({ allErrors: true });

router.post(
  "/get-repositories",
  [validate({ body: getRepositoriesSchema })],
  getRepositories
);
router.post(
  "/save-repositories",
  [validate({ body: saveRepositoriesSchema })],
  saveRepositories
);

module.exports = router;
