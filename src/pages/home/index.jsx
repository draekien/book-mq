/** @jsx jsx */
import { jsx, Flex, Box } from 'theme-ui';
import {
  homeContainerCss,
  homeButtonCss,
  homeBodyCss,
  homeHeadingCss,
  homeTextCss,
  knowMoreTextCss,
  knowMoreIconCss,
} from './index.styles';
import SvgIllustration from '../../components/svg-illustration';
import CustomButton from '../../components/custom-button';
import * as ReactIcon from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import useViewport from '../../hooks/useViewport';

const Home = () => {
  const { width } = useViewport();
  const breakpoint = 1470;

  return (
    <Flex sx={homeContainerCss}>
      <Flex sx={homeBodyCss}>
        <h2 sx={homeHeadingCss}>Events Made Easy</h2>

        <p sx={homeTextCss}>
          Here are BookMQ, we enable you to host and attend events with ease.
          You set the details, we take care of the booking - easy as that!
        </p>

        <NavLink sx={{ textDecoration: 'none' }} to="/how-it-works" exact>
          <CustomButton variant="solid" sx={homeButtonCss}>
            <Box sx={knowMoreTextCss}>Know More</Box>
            <ReactIcon.MdArrowForward sx={knowMoreIconCss} />
          </CustomButton>
        </NavLink>
      </Flex>
      {width > breakpoint ? (
        <SvgIllustration variant="events" />
      ) : (
        <SvgIllustration variant="events" width="100%" height={600} />
      )}
    </Flex>
  );
};

export default Home;
