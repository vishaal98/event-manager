const express = require("express");
const validate = require("../../middlewares/validate");
const eventValidation = require("../../validations/event_validation");
const eventController = require("../../controllers/event_controller");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.post(
  "/create",
  auth,
  validate(eventValidation.getEvent),
  eventController.createEvent
);

router.put(
  "/update/:eventId",
  auth,
  validate(eventValidation.updateEvent),
  eventController.updateEvent
);

router.delete(
  "/delete/:eventId",
  auth,
  validate(eventValidation.deleteEvent),
  eventController.deleteEvent
);

// router.put(
//   "/user/:userId",
//   auth,
//   validate(userValidation.updateUser),
//   userController.updateUser
// );

module.exports = router;
