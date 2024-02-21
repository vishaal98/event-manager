const httpStatus = require("http-status");
const Event = require("../models/event_model");

const createEvent = async (user, eventData) => {
  console.log(user);
  const event = await Event.create(eventData);
  if (!event) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Error creating Event"
    );
  }

  user.events.push(event);
  user.save();

  return event;
};

const updateEvent = async (eventId, eventData) => {
  const event = await Event.findById(eventId);
  if (!event) throw new ApiError(httpStatus.BAD_REQUEST, "Event doesn't exist");
  const updatedEvent = await Event.findOneAndUpdate(
    { _id: eventId },
    { $set: eventData },
    { new: true }
  );
  return updatedEvent;
};

const deleteEvent = async (user, eventId) => {
  const event = await Event.findByIdAndDelete(eventId);
  if (!event) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Event doesn't exist");
  }
  const eventIndex = user.events.findIndex((e) => e._id.equals(eventId));
  user.events.splice(eventIndex, 1);
  user.save();
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    events: user.events,
  };
};

module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
};
