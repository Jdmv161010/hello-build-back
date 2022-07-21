const { Router } = require("express");
const { authUser, registerUser } = require("./controller");

const router = Router();

// TODO: add validator schema
router.post("/register", [], registerUser);
router.post("/login", [], authUser);

module.exports = router;
