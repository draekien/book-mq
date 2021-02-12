import Axios from 'axios';
import AxiosUtils from '../utils/axios-utils';
import { API_URL } from '../utils/config';

const authApiUrl = `${API_URL}/auth`;

/**
 * Authenticates the user using a username and password
 * @param {object} data username and password
 * @returns {string} an access token
 */
const authenticate = async (data) => {
  const response = await Axios.post(authApiUrl, data);
  return response.data.token;
};

/**
 * Registers a new user
 * @param {object} data username, password, email, firstname, lastname
 * @returns {string} an access token
 */
const register = async (data) => {
  const url = `${authApiUrl}/register`;
  const response = await Axios.post(url, data);
  return response.data.token;
};

/**
 * Validates an access token
 * @param {string} token access token
 * @returns {string} a refreshed access token if token provided was valid
 */
const validateToken = async (token) => {
  const url = `${authApiUrl}/token`;
  const data = {};
  const headers = AxiosUtils.getHeaders();
  const response = await Axios.post(url, data, headers);
  return response.data.token;
};

export default { authenticate, register, validateToken };
