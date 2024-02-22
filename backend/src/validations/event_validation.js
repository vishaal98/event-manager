const Joi = require("joi");
const { objectId } = require("./custom_validation");

const getEvent = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    date: Joi.date().required(),
    location: Joi.string().required(),
    attendees: Joi.array().items(Joi.string().custom(objectId)),
  }),
};

const updateEvent = {
  body: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    category: Joi.string(),
    date: Joi.date(),
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

const registerEvent = {
  params: Joi.object().keys({
    eventId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  getEvent,
  updateEvent,
  deleteEvent,
  registerEvent,
};
