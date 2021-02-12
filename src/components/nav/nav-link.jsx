/** @jsx jsx */
import { jsx } from 'theme-ui';
import { NavLink } from 'react-router-dom';
import { navLinkCss } from './index.styles';

export const CustomNavLink = ({ path, children, ...rest }) => {
  return (
    <NavLink sx={navLinkCss} activeClassName="active" exact to={path} {...rest}>
      {children}
    </NavLink>
  );
};
