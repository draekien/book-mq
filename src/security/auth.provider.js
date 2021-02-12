/** @jsx jsx */
import { jsx } from 'theme-ui';
import * as React from 'react';
import { authReducer } from './auth.reducer';
import AuthContext from './auth.context';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/config';
import localStorage from '../utils/local-storage';
import authService from '../services/auth-service';

/**
 * Wrapper for providing auth context to children
 * @param {object} children the children to render
 */
const AuthProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(authReducer, {
    isLoading: true,
    isSignout: false,
    userToken: null,
    user: null,
  });

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      const storedToken = localStorage.getCookie('access_token');

      if (!storedToken) {
        dispatch({ type: 'SIGN_OUT' });
        return;
      }

      try {
        const token = await authService.validateToken(storedToken);

        const decodedToken = await jwt.verify(token, JWT_SECRET);

        localStorage.setCookie('access_token', token, decodedToken.exp);

        dispatch({
          type: 'RESTORE_TOKEN',
          token: token,
          user: {
            id: decodedToken.id,
            username: decodedToken.username,
            firstname: decodedToken.firstname,
            lastname: decodedToken.lastname,
          },
        });
      } catch (error) {
        dispatch({ type: 'SIGN_OUT' });
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        const token = await authService.authenticate(data);

        const decodedToken = await jwt.verify(token, JWT_SECRET);

        localStorage.setCookie('access_token', token, decodedToken.exp);

        dispatch({
          type: 'SIGN_IN',
          token: token,
          user: {
            id: decodedToken.id,
            username: decodedToken.username,
            firstname: decodedToken.firstname,
            lastname: decodedToken.lastname,
          },
        });
      },
      signOut: async () => {
        localStorage.deleteCookie('access_token');
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async (data) => {
        const token = await authService.register(data);

        const decodedToken = await jwt.verify(token, JWT_SECRET);

        localStorage.setCookie('access_token', token, decodedToken.exp);

        dispatch({
          type: 'SIGN_IN',
          token: token,
          user: {
            id: decodedToken.id,
            username: decodedToken.username,
            firstname: decodedToken.firstname,
            lastname: decodedToken.lastname,
          },
        });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={[state, authContext]}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
