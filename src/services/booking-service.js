import Axios from 'axios';
import AxiosUtils from '../utils/axios-utils';
import { API_URL } from '../utils/config';

const bookingApiUrl = `${API_URL}/bookings`;

/**
 * Get bookings for current user
 * @returns {Array<Object>} bookings
 */
const getForCurrentUser = async () => {
  const url = `${bookingApiUrl}/byuser`;
  const headers = AxiosUtils.getHeaders();
  const response = await Axios.get(url, headers);
  return response.data.bookings;
};

/**
 * Get a specific booking based on id
 * @param {string} bookingId booking id
 * @returns {object} booking
 */
const getById = async (bookingId) => {
  const url = `${bookingApiUrl}?id=${bookingId}`;
  const headers = AxiosUtils.getHeaders();
  const response = await Axios.get(url, headers);
  return response.data.booking;
};

/**
 * Get the bookings for an event
 * @param {string} eventId event id
 * @returns {Array<Object>} bookings
 */
const getByEventId = async (eventId) => {
  const url = `${bookingApiUrl}/byevent?eventId=${eventId}`;
  const headers = AxiosUtils.getHeaders();
  const response = await Axios.get(url, headers);
  return response.data.bookings;
};

/**
 * Create a new booking
 * @param {object} data the booking to create, i.e. {event: 'someid'}
 * @returns {object} the created booking
 */
const create = async (data) => {
  const headers = AxiosUtils.getHeaders();
  const response = await Axios.post(bookingApiUrl, { booking: data }, headers);
  return response.data.booking;
};

/**
 * Cancel an existing booking
 * @param {string} bookingId booking id to cancel
 */
const cancel = async (bookingId) => {
  const headers = AxiosUtils.getHeaders();
  const url = `${bookingApiUrl}?id=${bookingId}`;
  return await Axios.delete(url, headers);
};

export default { getForCurrentUser, getById, getByEventId, create, cancel };
