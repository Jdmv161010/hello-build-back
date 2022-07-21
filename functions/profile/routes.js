const { Router } = require("express");
const getRepositories = require("./controller");

const router = Router();

// TODO: add validator schema
router.post("/get-repositories", [], getRepositories);

module.exports = router;
