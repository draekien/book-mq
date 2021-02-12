/** @jsx jsx */
import { jsx } from 'theme-ui';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { logoCss } from './index.styles';
import AuthContext from '../../security/auth.context';

/**
 * Renders the BookMQ logo
 */
const Logo = () => {
  const [state] = React.useContext(AuthContext);

  return state.isSignout ? (
    <NavLink sx={logoCss} to="/">
      BookMQ
    </NavLink>
  ) : (
    <NavLink sx={logoCss} to="/all-events">
      BookMQ
    </NavLink>
  );
};

export default Logo;
