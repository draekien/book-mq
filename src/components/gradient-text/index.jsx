/** @jsx jsx */
import { jsx } from 'theme-ui';
import { gradientTextCss } from './index.styles';

/**
 * Renders text with a gradient
 * @param {string} text the text to render
 * @example
 * <GradientText text="gradient text" />
 */
const GradientText = ({ text, ...rest }) => {
  return (
    <span sx={gradientTextCss({ text })} {...rest}>
      {text}
    </span>
  );
};

export default GradientText;
