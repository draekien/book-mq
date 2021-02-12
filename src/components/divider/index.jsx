/** @jsx jsx */
import { jsx } from 'theme-ui';
import { dividerCss } from './index.styles';

/**
 * Renders a divider
 * @param {object} sx theme-ui style object
 * @param {string} variant empty string or gradient
 * @example
 * <Divider />
 * @example
 * <Divider variant="gradient" />
 */
const Divider = ({ sx, variant = '', ...rest }) => {
  return <div sx={{ ...dividerCss({ variant }), ...sx }} {...rest} />;
};

export default Divider;
