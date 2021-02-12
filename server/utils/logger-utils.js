const config = require('./config-utils');

/**
 * Logs your information to the console
 * @param  {...any} params what you want to log
 */
const info = (...params) => {
  if (config.NODE_ENV !== 'production') console.log(...params);
};

/**
 * Logs your errors to the console
 * @param  {...any} params errors you want to log
 */
const error = (...params) => {
  console.error(...params);
};

module.exports = {
  info,
  error,
};
