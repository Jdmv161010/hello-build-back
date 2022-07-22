const { Router } = require("express");
const { Validator } = require("express-json-validator-middleware");
const { authUser, registerUser } = require("./controller");
const registerUserSchema = require("./schemas/registerUserSchema.json");
const authUserSchema = require("./schemas/authUserSchema.json");

const router = Router();

const { validate } = new Validator({ allErrors: true });

router.post(
  "/register",
  [validate({ body: registerUserSchema })],
  registerUser
);
router.post("/login", [validate({ body: authUserSchema })], authUser);

module.exports = router;
