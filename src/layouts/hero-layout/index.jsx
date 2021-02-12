/** @jsx jsx */
import { Flex, jsx, Spinner } from 'theme-ui';
import * as styles from './index.styles';
import SvgIllustration from '../../components/svg-illustration';

/**
 * Renders a layout that has a hero element at the top of the page
 * @param {object} props hero, children, isLoading
 * @example
 * <HeroLayout
 *  hero={<div>I'm a hero</div>}
 *  isLoading={false}
 * >
 *  <div>I'm some content</div>
 * </HeroLayout>
 */
const HeroLayout = ({ hero, children, isLoading }) => {
  return isLoading ? (
    <Spinner sx={styles.spinnerCss} />
  ) : (
    <Flex sx={styles.containerCss}>
      <Flex sx={styles.heroContainerCss}>
        <SvgIllustration variant="collaborate" sx={styles.illustrationCss} />
        {hero}
        <SvgIllustration variant="team-up" sx={styles.illustrationCss} />
      </Flex>
      <Flex sx={styles.bodyContainerCss}>{children}</Flex>
    </Flex>
  );
};

export default HeroLayout;
