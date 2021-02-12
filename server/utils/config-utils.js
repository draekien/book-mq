require('dotenv').config();

const NODE_ENV = process.env.NODE_ENV;
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;
const MONGO_URI =
  NODE_ENV === 'test' || NODE_ENV === 'development'
    ? process.env.TEST_MONGO_URI
    : process.env.MONGO_URI;

module.exports = {
  JWT_SECRET,
  NODE_ENV,
  MONGO_URI,
};
