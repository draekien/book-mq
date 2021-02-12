/** @jsx jsx */
import { Box, Flex, jsx } from 'theme-ui';
import * as React from 'react';
import SvgIllustration from '../../components/svg-illustration';
import CustomButton from '../../components/custom-button';
import InputGroup from '../../components/input-group';
import * as styles from './index.styles';
import Divider from '../../components/divider';
import { NavLink, useHistory } from 'react-router-dom';
import useViewport from '../../hooks/useViewport';
import AuthContext from '../../security/auth.context';
import { ToastContext } from '../../components/toasts/toast.context';
import ReCAPTCHA from 'react-google-recaptcha';
import { RECAPTCHA_API_KEY } from '../../utils/config';

const SignupPage = () => {
  const [, authContext] = React.useContext(AuthContext);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstname, setFirstName] = React.useState('');
  const [lastname, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const { width } = useViewport();
  const breakpoint = 1450;
  const toast = React.useContext(ToastContext);
  const history = useHistory();
  const [isPassed, setIsPassed] = React.useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (loading) return;
    try {
      setLoading(true);
      await authContext.signUp({
        username,
        password,
        firstname,
        lastname,
        email,
      });
      history.push('/all-events');
    } catch (error) {
      toast.error({
        title: 'error',
        message: 'Username already exists',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex sx={styles.signupContainerCss}>
      {width > breakpoint && (
        <React.Fragment>
          <Flex sx={styles.leftSideContainerCss}>
            <SvgIllustration variant="festivities" />
          </Flex>
          <Divider sx={styles.dividerCss} />
        </React.Fragment>
      )}
      <Flex sx={styles.rightSideContainerCss}>
        <h1 sx={styles.signupHeadingCss}>Sign Up</h1>
        <Divider sx={styles.formDividerCss} variant="gradient" />
        <form sx={styles.signupFormCss} onSubmit={handleSignUp}>
          <InputGroup
            id="username"
            label="username"
            name="username"
            type="text"
            value={username}
            iconVariant="account-circle"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <InputGroup
            id="password"
            label="password"
            name="password"
            type="password"
            value={password}
            iconVariant="lock"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Flex sx={styles.nameFieldsCss}>
            <Box sx={styles.nameFieldInputCss}>
              <InputGroup
                id="firstname"
                label="firstname"
                name="firstname"
                type="text"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Box>
            <Box sx={styles.nameFieldInputCss}>
              <InputGroup
                id="lastname"
                label="lastname"
                name="lastname"
                type="text"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Box>
          </Flex>
          <InputGroup
            id="email"
            label="email"
            name="email"
            type="email"
            value={email}
            iconVariant="alternate-email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <ReCAPTCHA
            sx={{ mt: 'md' }}
            sitekey={RECAPTCHA_API_KEY}
            onChange={(e) => {
              setIsPassed({
                isPassed: e,
              });
            }}
          />
          <CustomButton
            variant="gradient"
            sx={styles.signupBtnCss}
            disabled={!isPassed}
          >
            SIGN UP
          </CustomButton>
        </form>
        <p sx={styles.signinTextCss}>
          Already have an account?{' '}
          <NavLink to="/signin">
            <CustomButton variant="text">Sign in</CustomButton>
          </NavLink>
        </p>
      </Flex>
    </Flex>
  );
};

export default SignupPage;
