const jwt = require('jsonwebtoken');

const config = require('./config-utils');
const logger = require('./logger-utils');

/**
 * Retrieves the authorization bearer token from the request object
 * @param {object} request http request
 * @example
 * const authUtils = require('../utils/auth-utils')
 * router.get('/token', (req, res) => {
 *  res.send(authUtils.getTokenFrom(req))
 * })
 */
const getTokenFrom = (request) => {
  const authHeader = request.get('authorization');
  return isBearerToken(authHeader) ? authHeader.substring(7) : null;
};

/**
 * Decodes the token and checks to see if its valid
 * @param {datetime} token jwt token
 * @returns {boolean} true if the token is valid
 */
const getDecodedToken = (token) => {
  if (!token) {
    return null;
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, config.JWT_SECRET);
  } catch (error) {
    logger.error(error);
    return null;
  }

  if (!isTokenContentValid(decodedToken)) {
    logger.error('decoded token content is invalid');
    return null;
  }

  return decodedToken;
};

/**
 * Checks to see if the token exists
 * @param {string} authHeader Authorization header string
 * @returns {boolean} true if authHeader is a bearer token
 */
const isBearerToken = (authHeader) =>
  authHeader && authHeader.toLowerCase().startsWith('bearer ');

/**
 * Checks to see if decoded token contains username and id
 * @param {string} decodedToken decoded token
 * @returns {boolean} true if token content is valid
 */
const isTokenContentValid = (decodedToken) =>
  decodedToken.username && decodedToken.id;

module.exports = { getTokenFrom, getDecodedToken };
