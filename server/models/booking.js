const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

const AutoPopulate = function (next) {
  this.populate('event');
  this.populate('user');
  next();
};

bookingSchema.pre('find', AutoPopulate);

/**
 * @swagger
 *
 * components:
 *  schemas:
 *    booking:
 *      type: object
 *      required:
 *        - event
 *        - user
 *        - deleted
 *      properties:
 *        event:
 *          type: string
 *        user:
 *          type: string
 *        deleted:
 *          type: boolean
 *          default: false
 */
bookingSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Booking', bookingSchema);
