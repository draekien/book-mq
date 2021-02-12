/** @jsx jsx */
import { jsx, Flex } from 'theme-ui';
import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/nav';
import SigninPage from './pages/signin-page';
import SignupPage from './pages/signup-page';
import Home from './pages/home';
import HowItWorks from './pages/how-it-works-page';
import ProfilePage from './pages/profile';
import useViewport from './hooks/useViewport';
import AuthContext from './security/auth.context';
import FullPageSpinner from './components/full-page-spinner';
import EventPage from './pages/event-page';
import AllEventsPage from './pages/all-events-page';
import AddEventPage from './pages/add-event-page';
import MyEventsPage from './pages/my-events-page';
import MyBookingsPage from './pages/my-bookings-page';
import ComingSoonPage from './pages/coming-soon-page';

const App = () => {
  const { height } = useViewport();
  const [{ isLoading, isSignout }] = React.useContext(AuthContext);

  return (
    <Router>
      <Flex
        id="outer-container"
        sx={{
          flexDirection: 'column',
          height: '100vh',
          justifyContent: 'center',
        }}
      >
        {isLoading ? (
          <FullPageSpinner />
        ) : (
          <React.Fragment>
            <Nav />
            <Flex
              id="page-wrap"
              sx={{
                mt: 104,
                justifyContent: 'center',
                height: height - 104,
                overflow: isSignout ? 'hidden' : 'auto',
              }}
            >
              <Switch>
                {isSignout ? (
                  <React.Fragment>
                    <Route path="/" exact component={Home} />
                    <Route path="/signin" component={SigninPage} />
                    <Route path="/signup" component={SignupPage} />
                    <Route path="/how-it-works" component={HowItWorks} />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Route path="/" exact component={AllEventsPage} />
                    <Route path="/all-events" component={AllEventsPage} />
                    <Route path="/add-event" component={AddEventPage} />
                    <Route path="/event/:id" component={EventPage} />
                    <Route path="/my-events" component={MyEventsPage} />
                    <Route path="/my-bookings" component={MyBookingsPage} />
                    <Route path="/profile/:userId" component={ProfilePage} />
                    <Route path="/account" component={ComingSoonPage} />
                    <Route path="/notifications" component={ComingSoonPage} />
                  </React.Fragment>
                )}
              </Switch>
            </Flex>
          </React.Fragment>
        )}
      </Flex>
    </Router>
  );
};

export default App;
