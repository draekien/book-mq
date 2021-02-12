/** @jsx jsx */
import { Flex, jsx, Text } from 'theme-ui';
import * as React from 'react';
import * as styles from './index.styles';
import BookingCard from '../booking-card';
import { useHistory } from 'react-router-dom';

/**
 * Renders a list of bookings
 * @param {Array<object>} bookings a list of bookings
 * @param {string} heading the heading for the list
 */
const BookingsList = ({ bookings, heading }) => {
  const history = useHistory();

  return (
    bookings?.length > 0 && (
      <React.Fragment>
        <Text variant="heading" sx={styles.headingCss}>
          {heading}
        </Text>
        <Flex sx={styles.bookingsContainerCss}>
          {bookings.map((booking, index) => (
            <BookingCard
              key={booking._id}
              booking={booking}
              index={index}
              onClick={() => history.push(`/event/${booking.event.id}`)}
            />
          ))}
        </Flex>
      </React.Fragment>
    )
  );
};

export default BookingsList;
