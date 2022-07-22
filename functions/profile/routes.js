const { Router } = require("express");
const { Validator } = require("express-json-validator-middleware");
const { getRepositories, saveRepositories } = require("./controller");
const getRepositoriesSchema = require("./schemas/getRepositoriesSchema.json");
const saveRepositoriesSchema = require("./schemas/saveRepositoriesSchema.json");

const router = Router();

const { validate } = new Validator({ allErrors: true });

router.post(
  "/get-repositories",
  [validate(getRepositoriesSchema)],
  getRepositories
);
router.post(
  "/save-repositories",
  [validate(saveRepositoriesSchema)],
  saveRepositories
);

module.exports = router;
