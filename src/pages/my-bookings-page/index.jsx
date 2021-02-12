/** @jsx jsx */
import { Flex, jsx, Spinner, Text } from 'theme-ui';
import * as React from 'react';
import * as styles from './index.styles';
import BookingsList from '../../components/bookings-list';
import Divider from '../../components/divider';
import useLoadMyBookings from '../../hooks/useLoadMyBookings';

const MyBookingsPage = () => {
  const { loading, future, past } = useLoadMyBookings();

  return (
    <Flex sx={styles.myBookingsPageCss}>
      {loading ? (
        <Spinner sx={styles.spinnerCss} />
      ) : (
        <React.Fragment>
          {future.length > 0 ? (
            <BookingsList bookings={future} heading="events in your future" />
          ) : (
            <Text variant="heading">
              looks like you're not attending any events soon
            </Text>
          )}
          <Divider sx={styles.dividerCss} variant="gradient" />
          <BookingsList bookings={past} heading="events you've attended" />
        </React.Fragment>
      )}
    </Flex>
  );
};

export default MyBookingsPage;
