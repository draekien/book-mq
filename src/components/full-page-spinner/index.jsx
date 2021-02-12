/** @jsx jsx */
import { Box, jsx, Spinner } from 'theme-ui';
import * as React from 'react';
import Logo from '../logo';
import { spinnerCss, spinnerLogoCss } from './index.styles';

/**
 * Renders a full page spinner with logo
 */
const FullPageSpinner = () => {
  return (
    <React.Fragment>
      <Box sx={spinnerLogoCss}>
        <Logo />
      </Box>
      <Spinner sx={spinnerCss} />
    </React.Fragment>
  );
};
export default FullPageSpinner;
