import LocalStorage from './local-storage';

/**
 * Get access token from cookie storage and return headers for axios
 */
const getHeaders = () => {
  const token = LocalStorage.getCookie('access_token');
  return {
    headers: {
      authorization: `bearer ${token}`,
    },
  };
};

export default { getHeaders };
