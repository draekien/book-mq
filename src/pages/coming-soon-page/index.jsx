/** @jsx jsx */
import { Flex, jsx, Text } from 'theme-ui';
import SvgIllustration from '../../components/svg-illustration';
import * as styles from './index.styles';

const ComingSoonPage = () => {
  return (
    <Flex sx={styles.comingSoonContainerCss}>
      <SvgIllustration
        variant="under-construction"
        sx={styles.illustrationCss}
      />
      <Text variant="hero">page under construction</Text>
      <Text variant="default">please check back later</Text>
    </Flex>
  );
};

export default ComingSoonPage;
