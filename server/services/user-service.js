const User = require('../models/user');
const logger = require('../utils/logger-utils');
const profileService = require('./profile-service');

/**
 * Get a user by their id
 * @param {string} id mongodb generated id
 * @returns {object} user or null
 */
const getById = async (id) => {
  try {
    const user = await User.findById(id);

    return user;
  } catch (error) {
    logger.error(error);
    return null;
  }
};

/**
 * Get a user by their username
 * @param {string} username username
 * @returns {object} user or null
 */
const getByUsername = async (username) => {
  try {
    const user = await User.findOne({
      username: { $regex: new RegExp(`^${username}$`), $options: 'i' },
    });

    return user;
  } catch (error) {
    logger.error(error);
    return null;
  }
};

/**
 * Create a new user
 * @param {object} user the user to create
 * @returns {object} the created user or null
 */
const create = async (user) => {
  try {
    const userToSave = new User(user);
    const savedUser = await userToSave.save();

    // create a default profile for the user
    const profile = await profileService.create({
      user: savedUser._id,
      avatar: `https://avatars.dicebear.com/api/identicon/${savedUser._id}.svg`,
    });

    await savedUser.updateOne({ profile: profile._id });

    return savedUser;
  } catch (error) {
    logger.error(error);
    return null;
  }
};

module.exports = { getById, getByUsername, create };
