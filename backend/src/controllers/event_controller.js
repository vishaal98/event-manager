const { eventService } = require("../services");
const catchAsync = require("../utils/catchAsync");

const listEvent = catchAsync(async (req, res) => {
  const events = await eventService.getAllEvents();
  res.send(events);
});

const createEvent = catchAsync(async (req, res) => {
  const event = await eventService.createEvent(req.user, req.body);
  res.send(event);
});

const updateEvent = catchAsync(async (req, res) => {
  const updatedEvent = await eventService.updateEvent(
    req.params.eventId,
    req.body
  );
  res.send(updatedEvent);
});

const deleteEvent = catchAsync(async (req, res) => {
  const user = await eventService.deleteEvent(req.user, req.params.eventId);
  res.send(user);
});

const registerToEvent = catchAsync(async (req, res) => {
  console.log(req.user);
  const event = await eventService.registerEvent(req.user, req.params.eventId);
  res.send(event);
});

const getAllMyEvents = catchAsync(async (req, res) => {
  const myEvents = await eventService.getAllMyEvents(req.user);
  res.send(myEvents);
});

module.exports = {
  listEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  registerToEvent,
  getAllMyEvents,
};
