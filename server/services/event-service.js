const Event = require('../models/event');
const logger = require('../utils/logger-utils');

/**
 * Gets all events
 * @returns {Array<Document>} Array of all events
 */
const getAll = async () => {
  const events = await Event.find({}, null, {
    sort: { timeStart: -1 },
  }).populate('bookings');

  return events;
};

/**
 * Get all events owned by a specific user
 * @param {string} userId user id
 * @returns {Array<Document>} Array of events
 */
const getByUserId = async (userId) => {
  const events = await Event.find({ user: userId, deleted: false }, null, {
    sort: { timeStart: -1 },
  }).populate('bookings');

  return events;
};

/**
 * Get an event by its ID
 * @param {string} eventId event id
 * @returns {Document} the event
 */
const getById = async (eventId) => {
  try {
    const event = await Event.findById(eventId).deepPopulate([
      'bookings',
      'bookings.user',
      'bookings.user.profile',
    ]);

    return [event];
  } catch (error) {
    logger.error(error);
    return [];
  }
};

/**
 * Create a new event
 * @param {object} event event to create
 * @returns {Document} the created event
 */
const create = async (event) => {
  const eventToSave = new Event(event);
  const savedEvent = await eventToSave.save();

  return savedEvent;
};

module.exports = { getAll, getByUserId, getById, create };
