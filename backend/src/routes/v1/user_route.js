const express = require("express");
const validate = require("../../middlewares/validate");
const userValidation = require("../../validations/user_validation");
const userController = require("../../controllers/user_controller");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.get(
  "/:userId",
  auth,
  validate(userValidation.getUser),
  userController.getUser
);

router.put(
  "/user/:userId",
  auth,
  validate(userValidation.updateUser),
  userController.updateUser
);

module.exports = router;
