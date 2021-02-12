/** @jsx jsx */
import { Flex, jsx, Text } from 'theme-ui';
import SvgIcon from '../svg-icon';

/**
 * Renders a text with an icon to the left
 * @param {string} variant an icon variant
 * @param {string} children the text to display
 */
const IconText = ({ variant, children }) => {
  return (
    <Flex sx={{ mr: 'sm', alignItems: 'center', gap: 'xs' }}>
      <SvgIcon variant={variant} />
      <Text sx={{ fontFamily: 'body', fontSize: 14 }}>{children}</Text>
    </Flex>
  );
};

export default IconText;
