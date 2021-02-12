const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  biography: {
    type: String,
    default: '',
    trim: true,
  },
  phoneNumber: {
    type: String,
    default: '',
    trim: true,
  },
  follows: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    default: [],
  },
  avatar: {
    type: String,
    default: '',
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const AutoPopulate = function (next) {
  this.populate('user');
  next();
};

profileSchema
  .pre('find', AutoPopulate)
  .pre('findOne', AutoPopulate)
  .pre('findOneAndUpdate', AutoPopulate);

/**
 * @swagger
 *
 * components:
 *  schemas:
 *    profile:
 *      type: object
 *      required:
 *        - user
 *      properties:
 *        biography:
 *          type: string
 *          default: ""
 *        phoneNumber:
 *          type: string
 *          default: ""
 *        follows:
 *          type: array
 *          default: []
 *          items:
 *            type: string
 *        avatar:
 *          type: string
 *          default: ""
 *        user:
 *          type: string
 *          description: userId
 */
profileSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Profile', profileSchema);
