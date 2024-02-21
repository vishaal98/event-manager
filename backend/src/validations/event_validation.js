const Joi = require("joi");
const { objectId } = require("./custom_validation");

const getEvent = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    date: Joi.date().required(),
    time: Joi.string().required(),
    location: Joi.string().required(),
    attendees: Joi.array().items(Joi.string().custom(objectId)),
  }),
};

const updateEvent = {
  body: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    date: Joi.date(),
    time: Joi.string(),
    location: Joi.string(),
    attendees: Joi.array().items(Joi.string().custom(objectId)),
  }),
  params: Joi.object().keys({
    eventId: Joi.string().custom(objectId),
  }),
};

const deleteEvent = {
  params: Joi.object().keys({
    eventId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  getEvent,
  updateEvent,
  deleteEvent,
};
