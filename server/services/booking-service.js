const Booking = require('../models/booking');
const Event = require('../models/event');

/**
 * Creates a new booking
 * @param {object} booking booking to create
 * @returns {Document} created booking
 */
const create = async (booking) => {
  const bookingToSave = new Booking(booking);
  const savedBooking = await bookingToSave.save();

  await Event.findByIdAndUpdate(
    booking.event,
    { $push: { bookings: savedBooking._id } },
    { useFindAndModify: false }
  );

  return savedBooking;
};

const getByUserId = async (userId) => {
  const bookings = await Booking.find({ deleted: false, user: userId });
  return bookings;
};
/**
 * Get a booking by its Id
 * @param {string} id Booking id
 * @returns {Document} the booking
 */
const getById = async (id) => {
  const booking = await Booking.findById(id);

  return booking;
};

const getByEventId = async (eventId) => {
  const bookings = await Booking.find({ event: eventId });

  return bookings;
};

const cancel = async (bookingId, userId) => {
  const booking = await Booking.findOneAndUpdate(
    { _id: bookingId, user: userId },
    { deleted: true },
    { useFindAndModify: false, new: true }
  );

  return booking.deleted;
};

module.exports = { create, getByUserId, getById, getByEventId, cancel };
