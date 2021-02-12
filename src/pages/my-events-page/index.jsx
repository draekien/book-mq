/** @jsx jsx */
import { Flex, jsx, Spinner, Text } from 'theme-ui';
import * as React from 'react';
import * as styles from './index.styles';
import CustomButton from '../../components/custom-button';
import SvgIcon from '../../components/svg-icon';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../security/auth.context';
import EventsList from '../../components/events-list';
import Divider from '../../components/divider';
import useLoadEvents from '../../hooks/useLoadEvents';

const MyEventsPage = () => {
  const [{ user }] = React.useContext(AuthContext);
  const { loading, featured, normal } = useLoadEvents(user.id);
  const history = useHistory();

  return (
    <Flex sx={styles.myEventsPageCss}>
      {loading ? (
        <Spinner sx={styles.spinnerCss} />
      ) : (
        <React.Fragment>
          <CustomButton
            variant="icon"
            onClick={() => history.push('/add-event')}
            sx={styles.addEventBtnCss}
          >
            <SvgIcon variant="add" sx={styles.addEventBtnIconCss} />
          </CustomButton>
          {featured.future.length > 0 ? (
            <EventsList heading="featured events" events={featured.future} />
          ) : (
            <React.Fragment>
              <Text variant="heading">
                looks like none of your upcoming events are featured
              </Text>
              <Text variant="subtitle" sx={{ mt: 'sm' }}>
                click the promote button in any of your upcoming events to make
                it a featured event
              </Text>
            </React.Fragment>
          )}
          <Divider variant="gradient" sx={styles.dividerCss} />
          <EventsList heading="upcoming events" events={normal.future} />
          <EventsList heading="past events" events={normal.past} />
        </React.Fragment>
      )}
    </Flex>
  );
};

export default MyEventsPage;
