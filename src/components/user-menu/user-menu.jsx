/** @jsx jsx */
import { jsx, Flex, Button } from 'theme-ui';
import * as React from 'react';
import AuthContext from '../../security/auth.context';
import { CustomNavLink } from '../nav/nav-link';
import {
  menuItemContainerCss,
  menuItemCss,
  signOutButtonCss,
  userMenuCss,
} from './index.styles';

const UserDropdownMenu = ({ open, handleClick, onSignOut }) => {
  const [{ user }] = React.useContext(AuthContext);

  return (
    <Flex sx={userMenuCss({ open })} onClick={handleClick}>
      <Flex sx={menuItemContainerCss}>
        <CustomNavLink sx={menuItemCss} path={`/profile/${user.id}`}>
          profile
        </CustomNavLink>
        <CustomNavLink sx={menuItemCss} path="/account">
          account
        </CustomNavLink>
        <CustomNavLink sx={menuItemCss} path="/notifications">
          notifications
        </CustomNavLink>
      </Flex>
      <Button sx={signOutButtonCss} onClick={onSignOut}>
        SIGNOUT
      </Button>
    </Flex>
  );
};

export default UserDropdownMenu;
