/** @jsx jsx */
import { Flex, jsx, Spinner, Text } from 'theme-ui';
import * as React from 'react';
import * as styles from './index.styles';
import CustomButton from '../../components/custom-button';
import SvgIcon from '../../components/svg-icon';
import { useHistory } from 'react-router-dom';
import EventsList from '../../components/events-list';
import Divider from '../../components/divider';
import useLoadEvents from '../../hooks/useLoadEvents';

const AllEventsPage = () => {
  const { loading, featured, normal } = useLoadEvents();
  const history = useHistory();

  return (
    <Flex sx={styles.allEventsPageCss}>
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
          <EventsList
            heading="featured upcoming events"
            events={featured.future}
          />
          <EventsList heading="upcoming events" events={normal.future} />
          {featured.future.length === 0 && normal.future.length === 0 && (
            <React.Fragment>
              <Text variant="heading" sx={{ mb: 'sm' }}>
                there doesn't appear to be any upcoming events
              </Text>
              <Text variant="subtitle">
                maybe you would like to host an event yourself?
              </Text>
              <Text variant="subtitle">
                click the plus button located at the bottom right hand corner of
                your screen to make one!
              </Text>
            </React.Fragment>
          )}
          <Divider variant="gradient" sx={styles.dividerCss} />
          <EventsList heading="past events" events={normal.past} />
        </React.Fragment>
      )}
    </Flex>
  );
};

export default AllEventsPage;
