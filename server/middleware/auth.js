const authUtils = require('../utils/auth-utils');

module.exports = (req, res, next) => {
  try {
    const token = authUtils.getTokenFrom(req);
    const decodedToken = authUtils.getDecodedToken(token);

    if (decodedToken === null) {
      throw new Error('token missing or invalid');
    } else {
      next();
    }
  } catch (error) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }
};
