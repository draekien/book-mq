/**
 * Converts seconds to DateTime
 * @param {number} secs seconds timestamp
 */
export const toDateTime = (secs) => {
  var t = new Date(1970, 0, 1);
  t.setSeconds(secs);
  return t;
};
