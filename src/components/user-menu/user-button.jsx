/** @jsx jsx */
import { Button, jsx } from 'theme-ui';
import * as React from 'react';
import AuthContext from '../../security/auth.context';
import { initialsCss, userButtonCss } from './index.styles';

const UserButton = ({ open, onClick }) => {
  const [{ user }] = React.useContext(AuthContext);

  const initials = () => user.firstname.charAt(0) + user.lastname.charAt(0);

  return (
    <Button sx={userButtonCss({ open })} onClick={onClick}>
      <h2 sx={initialsCss}>
        {user?.firstname && user?.lastname ? initials().toUpperCase() : 'U'}
      </h2>
    </Button>
  );
};

export default UserButton;
