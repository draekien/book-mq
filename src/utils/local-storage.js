import { toDateTime } from './datetime-util';

/**
 * Set a cookie
 * @param {string} cname cookie name
 * @param {string} cvalue cookie value
 * @param {string} expiry expiry date
 */
const setCookie = (cname, cvalue, expiry) => {
  var expires = `expires=${toDateTime(expiry).toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/;`;
};

/**
 * Get a cookie
 * @param {string} cname cookie name
 * @returns {string} cookie
 */
const getCookie = (cname) => {
  var name = cname + '=';
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }

  return '';
};

/**
 * Delete a cookie (set it to expired)
 * @param {string} cname cookie name
 */
const deleteCookie = (cname) => {
  document.cookie = `${cname}=; expired=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export default {
  setCookie,
  getCookie,
  deleteCookie,
};
