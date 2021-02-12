import Axios from 'axios';
import AxiosUtils from '../utils/axios-utils';
import { API_URL } from '../utils/config';

const profileApiUrl = `${API_URL}/profile`;

/**
 * Get profile of current user
 * @returns {object} their profile
 */
const getForCurrentUser = async () => {
  const headers = AxiosUtils.getHeaders();
  const response = await Axios.get(profileApiUrl, headers);
  return response.data.profile;
};

/**
 * Get a profile by user id
 * @param {string} userId user id
 * @returns {object} the profile
 */
const getByUserId = async (userId) => {
  const url = `${profileApiUrl}?userId=${userId}`;
  const headers = AxiosUtils.getHeaders();
  const response = await Axios.get(url, headers);
  return response.data.profile;
};

/**
 * Update a profile
 * @param {object} data updated profile
 * @returns {object} the updated profile
 */
const update = async (data) => {
  const headers = AxiosUtils.getHeaders();
  const response = await Axios.patch(profileApiUrl, { profile: data }, headers);
  return response.data.profile;
};

/**
 * Follow a user
 * @param {string} followUserId user id
 * @returns {object} updated profile with the new follow
 */
const follow = async (followUserId) => {
  const headers = AxiosUtils.getHeaders();
  const data = { followUserId };
  const url = `${profileApiUrl}/follow`;
  const response = await Axios.patch(url, data, headers);
  return response.data.profile;
};

/**
 * Unfollow a user
 * @param {string} followUserId user id
 * @returns {object} updated profile with the new unfollow
 */
const unfollow = async (followUserId) => {
  const headers = AxiosUtils.getHeaders();
  const data = { followUserId };
  const url = `${profileApiUrl}/unfollow`;
  const response = await Axios.patch(url, data, headers);
  return response.data.profile;
};

export default { getForCurrentUser, getByUserId, update, follow, unfollow };
