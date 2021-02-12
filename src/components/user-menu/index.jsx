/** @jsx jsx */
import { jsx } from 'theme-ui';
import * as React from 'react';
import UserButton from './user-button';
import { userMenuContainerCss } from './index.styles';
import UserDropdownMenu from './user-menu';

/**
 * Renders the user menu
 * @param {Function} onSignOut function to handle the signout
 * @example
 * <UserMenu onSignOut={handleSignout} />
 */
const UserMenu = ({ onSignOut }) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = (e) => {
    e.preventDefault();

    setOpen(!open);
  };

  return (
    <div sx={userMenuContainerCss}>
      <UserButton open={open} onClick={handleClick} />
      <UserDropdownMenu
        open={open}
        onClick={handleClick}
        onSignOut={onSignOut}
      />
    </div>
  );
};

export default UserMenu;
