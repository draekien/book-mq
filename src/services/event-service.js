import Axios from 'axios';
import AxiosUtils from '../utils/axios-utils';
import { API_URL } from '../utils/config';

const eventApiUrl = `${API_URL}/events`;

/**
 * Create a new event
 * @param {object} data event to create
 * @returns {object} the created event
 */
export const create = async (data) => {
  const headers = AxiosUtils.getHeaders();
  const response = await Axios.post(eventApiUrl, { event: data }, headers);
  return response.data.event;
};

/**
 * Get an event by its id
 * @param {string} eventId event id
 * @returns {object} the event
 */
export const getById = async (eventId) => {
  const url = `${eventApiUrl}?id=${eventId}`;
  const headers = AxiosUtils.getHeaders();
  const response = await Axios.get(url, headers);
  return response.data.events[0];
};

/**
 * Get all events
 * @returns {Array<object>} events
 */
export const getAll = async () => {
  const headers = AxiosUtils.getHeaders();
  const response = await Axios.get(eventApiUrl, headers);
  return response.data.events;
};

/**
 * Get events for the provided user id
 * @param {string} userId user id
 * @returns {Array<object>} events
 */
export const getByUser = async (userId) => {
  const url = `${eventApiUrl}/user?userId=${userId}`;
  const headers = AxiosUtils.getHeaders();
  const response = await Axios.get(url, headers);
  return response.data.events;
};

/**
 * Updates the specified event
 * @param {string} eventId the id of the event to update
 * @param {object} data the updated event
 * @returns {object} the updated event
 */
export const update = async (eventId, data) => {
  const url = `${eventApiUrl}/${eventId}`;
  const headers = AxiosUtils.getHeaders();
  const response = await Axios.patch(url, { event: data }, headers);
  return response.data.event;
};

/**
 * Cancels the specified event
 * @param {string} eventId the event to cancel
 */
export const cancel = async (eventId) => {
  const url = `${eventApiUrl}/${eventId}`;
  const headers = AxiosUtils.getHeaders();
  return await Axios.delete(url, headers);
};

export default { create, getById, getAll, getByUser, update, cancel };
