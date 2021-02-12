const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  maxAttendees: {
    type: Number,
    required: true,
  },
  bookings: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
    default: [],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  address: {
    type: {
      street: String,
      city: String,
      state: String,
      postcode: String,
    },
    required: true,
  },
  timeStart: {
    type: Date,
    required: true,
  },
  timeEnd: {
    type: Date,
    required: true,
  },
  fee: {
    type: Number,
    default: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

eventSchema.plugin(deepPopulate);

const AutoPopulate = function (next) {
  this.populate('user');
  next();
};

eventSchema.virtual('attendees').get(function () {
  return this.bookings.length;
});

eventSchema
  .pre('find', AutoPopulate)
  .pre('findOne', AutoPopulate)
  .pre('findOneAndUpdate', AutoPopulate);

eventSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    delete returnedObject.__v;
  },
  virtuals: true,
});

/**
 * @swagger
 *
 * components:
 *  schemas:
 *    address:
 *      type: object
 *      required:
 *        - street
 *        - city
 *        - state
 *        - postcode
 *      properties:
 *        street:
 *          type: string
 *          example: 175 Pitt St
 *        city:
 *          type: string
 *          example: Sydney
 *        state:
 *          type: string
 *          example: NSW
 *        postcode:
 *          type: number
 *          example: 2000
 *    event:
 *      type: object
 *      required:
 *        - title
 *        - owner
 *        - timeStart
 *        - timeEnd
 *        - maxAttendees
 *        - attendees
 *        - fee
 *        - address
 *        - description
 *      properties:
 *        title:
 *          type: string
 *          example: COMP3120 Tutoring
 *        owner:
 *          type: string
 *          example: Tester2
 *        date:
 *          type: number
 *        recurring:
 *          type: array
 *          items:
 *            type: string
 *            description: recurring days
 *            example: ['Monday', 'Wednesday']
 *        timeStart:
 *          type: number
 *        timeEnd:
 *          type: number
 *        maxAttendees:
 *          type: number
 *          example: 100
 *        attendees:
 *          type: number
 *          example: 54
 *        fee:
 *          type: number
 *          example: 20.25
 *        address:
 *          $ref: '#/components/schemas/address'
 *        description:
 *          type: string
 *          example: lorem ipsum
 *    eventUpdate:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *          example: COMP3120 Tutoring
 *        owner:
 *          type: string
 *          example: Tester2
 *        date:
 *          type: number
 *        recurring:
 *          type: array
 *          items:
 *            type: string
 *            description: recurring days
 *            example: ['Monday', 'Wednesday']
 *        timeStart:
 *          type: number
 *        timeEnd:
 *          type: number
 *        maxAttendees:
 *          type: number
 *          example: 100
 *        attendees:
 *          type: number
 *          example: 54
 *        fee:
 *          type: number
 *          example: 20.25
 *        address:
 *          $ref: '#/components/schemas/address'
 *        description:
 *          type: string
 *          example: lorem ipsum
 */
eventSchema.set('toObject', {
  getters: true,
  virtuals: true,
});

module.exports = mongoose.model('Event', eventSchema);
