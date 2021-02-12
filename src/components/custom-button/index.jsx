/** @jsx jsx */
import { Button, jsx, Spinner } from 'theme-ui';
import { customButtonCss } from './index.styles';
import GradientText from '../gradient-text';

/**
 * Renders a custom button
 * @param {object} sx theme-ui style object
 * @param {string} variant one of solid, gradient, text
 * @param {Function} onClick function to handle button click
 * @param {React.ReactNode} children children to be rendered inside the button
 * @example
 * <CustomButton variant="solid" onClick={handleClick}>button</CustomButton>
 */
const CustomButton = ({
  sx,
  variant,
  onClick,
  isLoading,
  children,
  disabled,
  ...rest
}) => {
  return (
    <Button
      sx={{ ...customButtonCss({ variant, disabled }), ...sx }}
      onClick={onClick}
      disabled={isLoading || disabled}
      {...rest}
    >
      {variant === 'text' ? (
        <GradientText text={children} />
      ) : isLoading ? (
        <Spinner sx={{ color: 'text', height: '2rem', width: '2rem' }} />
      ) : (
        children
      )}
    </Button>
  );
};

export default CustomButton;
