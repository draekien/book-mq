const Profile = require('../models/profile');
const logger = require('../utils/logger-utils');

/**
 * Get the profile of the user specified by the userId
 * @param {string} userId
 * @returns {Document} the profile
 */
const getByUserId = async (userId) => {
  try {
    const profile = await Profile.findOne({ user: userId }).populate({
      path: 'follows',
      populate: { path: 'profile' },
    });

    return profile;
  } catch (error) {
    logger.error(error);
    return null;
  }
};

/**
 * Creates a new profile
 * @param {object} profile the profile to create, must have userId
 *
 */
const create = async (profile) => {
  try {
    const profileToSave = new Profile(profile);
    const savedProfile = await profileToSave.save();

    return savedProfile;
  } catch (error) {
    logger.error(error);
    return null;
  }
};

/**
 * Update a profile. To follow or unfollow, use follow and unfollow instead
 * @param {string} userId the user id
 * @param {object} profile the updated profile
 */
const update = async (userId, profile) => {
  try {
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: userId },
      profile,
      { useFindAndModify: false, new: true }
    ).populate({ path: 'follows', populate: { path: 'profile' } });

    return updatedProfile;
  } catch (error) {
    logger.error(error);
    return null;
  }
};

/**
 * Follow a user
 * @param {string} userId user id
 * @param {string} followUserId user id of user to follow
 */
const follow = async (userId, followUserId) => {
  try {
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: userId },
      { $push: { follows: followUserId } },
      { useFindAndModify: false, new: true }
    );

    return updatedProfile;
  } catch (error) {
    logger.error(error);
    return null;
  }
};

/**
 * Unfollow a user
 * @param {string} userId user id
 * @param {string} followUserId user id of user to unfollow
 */
const unfollow = async (userId, followUserId) => {
  try {
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: userId },
      { $pull: { follows: followUserId } },
      { useFindAndModify: false, new: true }
    );

    return updatedProfile;
  } catch (error) {
    logger.error(error);
    return null;
  }
};

module.exports = {
  getByUserId,
  create,
  update,
  follow,
  unfollow,
};
