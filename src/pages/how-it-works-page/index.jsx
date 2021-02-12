/** @jsx jsx */
import { jsx, Box, Flex } from 'theme-ui';
import { StepsGroup } from './steps-group';
import * as styles from './index.styles';
import SvgIllustration from '../../components/svg-illustration';
import CustomButton from '../../components/custom-button';
import * as ReactIcon from 'react-icons/md';
import { NavLink } from 'react-router-dom';

const HowItWorks = () => {
  return (
    <Flex sx={styles.stepsContainerCss}>
      <div sx={styles.triangleCss} />
      <Flex sx={styles.stepsContainerRowCss}>
        <StepsGroup heading="1. You create">
          <Box>
            <p>You can set all the details of your event, including:</p>
            <ul>
              <li>recurring or one-off</li>
              <li>duration</li>
              <li>max attendees</li>
              <li>price</li>
            </ul>
          </Box>
          <SvgIllustration variant="add-post" />
        </StepsGroup>
        <StepsGroup heading="2. We market">
          <Box>
            <p>
              We spread the word about your event. The more popular it gets, the
              more visible it is. If you want to boost your event’s visiblity,
              you can purchase an ad.
            </p>
          </Box>
          <SvgIllustration variant="online-ad" />
        </StepsGroup>
      </Flex>
      <Flex sx={styles.stepsContainerRowCss}>
        <StepsGroup heading="3. Users register">
          <p>
            Other BookMQ users can register for any available time-slot in your
            event. You get the final say on who can attend.
          </p>
          <SvgIllustration variant="date-picker" />
        </StepsGroup>
        <StepsGroup heading="4. You profit">
          <p>
            We don’t take a cut of your event’s pricing so you get to take home
            all the profits!
          </p>
          <SvgIllustration variant="make-it-rain" />
        </StepsGroup>
        <StepsGroup>
          <NavLink sx={styles.signupNavLinkCss} to="/signup" exact>
            <CustomButton variant="solid" sx={styles.signupBtnCss}>
              <Box sx={styles.signupTextCss}>Signup Now</Box>
              <ReactIcon.MdArrowForward sx={styles.signupIconCss} />
            </CustomButton>
          </NavLink>
        </StepsGroup>
      </Flex>
    </Flex>
  );
};

export default HowItWorks;
