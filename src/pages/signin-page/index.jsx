/** @jsx jsx */
import { Box, Flex, jsx } from 'theme-ui';
import * as React from 'react';
import AuthContext from '../../security/auth.context';
import SvgIllustration from '../../components/svg-illustration';
import CustomButton from '../../components/custom-button';
import InputGroup from '../../components/input-group';
import * as styles from './index.styles';
import Divider from '../../components/divider';
import { NavLink, useHistory } from 'react-router-dom';
import useViewport from '../../hooks/useViewport';
import { ToastContext } from '../../components/toasts/toast.context';
import { RECAPTCHA_API_KEY } from '../../utils/config';
import ReCAPTCHA from 'react-google-recaptcha';

const SigninPage = () => {
  const [, authContext] = React.useContext(AuthContext);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const { width } = useViewport();
  const breakpoint = 1450;
  const toast = React.useContext(ToastContext);
  const history = useHistory();
  const [isPassed, setIsPassed] = React.useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);
      await authContext.signIn({ username, password });
      history.push('/all-events');
    } catch (error) {
      toast.error({
        title: 'error',
        message: 'Invalid username or password.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex sx={styles.signInContainerCss}>
      {width > breakpoint && (
        <React.Fragment>
          <Flex sx={styles.leftSideContainerCss}>
            <SvgIllustration variant="authentication" />
          </Flex>
          <Divider sx={styles.dividerCss} />
        </React.Fragment>
      )}
      <Flex sx={styles.rightSideContainerCss}>
        <h1 sx={styles.loginHeadingCss}>Login</h1>
        <Divider sx={styles.formDividerCss} variant="gradient" />
        <form sx={styles.signinFormCss} onSubmit={handleSignIn}>
          <Box sx={styles.formInputCss}>
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
          </Box>
          <Box sx={styles.formInputCss}>
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
          </Box>
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
            isLoading={loading}
            sx={styles.loginBtnCss}
            disabled={!isPassed}
          >
            LOGIN
          </CustomButton>
        </form>
        <p sx={styles.signupTextCss}>
          Don't have an account?{' '}
          <NavLink to="/signup">
            <CustomButton variant="text">Signup</CustomButton>
          </NavLink>
        </p>
        <p sx={styles.forgotPasswordTextCss}>
          Forget your password?
          <br />
          <NavLink to="/password-reset">
            <CustomButton variant="text">Get help signing in</CustomButton>
          </NavLink>
        </p>
      </Flex>
    </Flex>
  );
};

export default SigninPage;
