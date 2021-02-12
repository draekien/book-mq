/** @jsx jsx */
import { Box, Flex, jsx } from 'theme-ui';
import * as React from 'react';
import AuthContext from '../../security/auth.context';
import { CustomNavLink } from './nav-link';
import Logo from '../logo';
import {
  mobileLogoCss,
  mobileMenuContainerCss,
  mobileMenuCss,
  mobileNavCss,
  navCss,
} from './index.styles';
import UserMenu from '../user-menu';
import { slide as Menu } from 'react-burger-menu';
import useViewport from '../../hooks/useViewport';
import { useHistory } from 'react-router-dom';

/**
 * Renders the Navbar
 */
const Nav = () => {
  const [state, authContext] = React.useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const { width } = useViewport();
  const breakpoint = 780;
  const history = useHistory();

  const handleSignOut = async (e) => {
    e.preventDefault();

    await authContext.signOut();
    history.push('/');
  };

  const FullWidthMenuLink = ({ path, children }) => {
    return (
      <Box>
        <CustomNavLink path={path}>{children}</CustomNavLink>
      </Box>
    );
  };

  return width < breakpoint ? (
    <nav sx={mobileMenuContainerCss} onClick={() => open && setOpen(false)}>
      <Menu
        styles={mobileMenuCss}
        pageWrapId="page-wrap"
        outerContainerId="outer-container"
        isOpen={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      >
        {!state.isSignout ? (
          <React.Fragment>
            <FullWidthMenuLink path="/all-events">Home</FullWidthMenuLink>
            <FullWidthMenuLink path="/my-events">My Events</FullWidthMenuLink>
            <FullWidthMenuLink path="/my-bookings">
              My bookings
            </FullWidthMenuLink>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <FullWidthMenuLink path="/">Home</FullWidthMenuLink>
            <FullWidthMenuLink path="/how-it-works">
              How it works
            </FullWidthMenuLink>
          </React.Fragment>
        )}
      </Menu>
      <Flex sx={mobileNavCss}>
        <Box sx={mobileLogoCss}>
          <Logo />
        </Box>
        {!state.isSignout ? (
          <UserMenu onSignOut={handleSignOut} />
        ) : (
          <CustomNavLink path="/signin">Sign in</CustomNavLink>
        )}
      </Flex>
    </nav>
  ) : (
    <nav sx={navCss}>
      <Logo />
      <div>
        {!state.isSignout ? (
          <React.Fragment>
            <CustomNavLink path="/all-events">Home</CustomNavLink>
            <CustomNavLink path="/my-events">My Events</CustomNavLink>
            <CustomNavLink path="/my-bookings">My bookings</CustomNavLink>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <CustomNavLink path="/">Home</CustomNavLink>
            <CustomNavLink path="/how-it-works">How it works</CustomNavLink>
          </React.Fragment>
        )}
      </div>

      {!state.isSignout ? (
        <UserMenu onSignOut={handleSignOut} />
      ) : (
        <CustomNavLink path="/signin">Sign in</CustomNavLink>
      )}
    </nav>
  );
};

export default Nav;
