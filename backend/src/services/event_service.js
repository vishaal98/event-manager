const httpStatus = require("http-status");
const Event = require("../models/event_model");
const ApiError = require("../utils/apiError");

const getAllEvents = async () => {
  const events = Event.find({}).populate({
    path: "attendees",
    select: "-password -events", // Exclude the password field
  });

  return events;
};

const createEvent = async (user, eventData) => {
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

const registerEvent = async (user, eventId) => {
  let event = await Event.findById(eventId);
  if (!event)
    throw new ApiError(httpStatus.BAD_REQUEST, "Event does not exist");
  const index = event.attendees.indexOf(user._id);
  if (index === -1) event.attendees.push(user._id);
  else throw new ApiError(httpStatus.ALREADY_REPORTED, "Already Registered");
  await event.save();
  return event;
};

const getAllMyEvents = async (user) => {
  const updatedUser = await user.populate({ path: "events" });
  return updatedUser.events;
};

module.exports = {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  registerEvent,
  getAllMyEvents,
};
