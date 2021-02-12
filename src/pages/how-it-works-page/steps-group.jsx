/** @jsx jsx */
import { jsx, Flex } from 'theme-ui';
import * as styles from './index.styles';

export const StepsGroup = ({ heading, children, ...rest }) => {
  return (
    <Flex sx={styles.stepsGroupCss} {...rest}>
      <h2 sx={styles.stepsHeadingCss}>{heading}</h2>
      <Flex sx={styles.stepsBodyCss}>{children}</Flex>
    </Flex>
  );
};
