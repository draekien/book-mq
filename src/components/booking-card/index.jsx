/** @jsx jsx */
import { Flex, jsx, Text } from 'theme-ui';
import * as React from 'react';
import * as styles from './index.styles';
import IconText from '../icon-text';

/**
 * Renders a booking card
 * @param {object} booking the booking to render
 * @param {number} index determines the gradient direction
 */
const BookingCard = ({ booking, index, ...rest }) => {
  const eventDate = React.useMemo(() => {
    let date = new Date(Date.parse(booking.event.timeStart));
    console.log(date);
    return date.toLocaleDateString();
  }, [booking.event.timeStart]);

  const eventTime = React.useMemo(() => {
    let startTime = new Date(Date.parse(booking.event.timeStart));
    let endTime = new Date(Date.parse(booking.event.timeEnd));
    let formatter = Intl.DateTimeFormat('default', {
      hour12: true,
      hour: 'numeric',
      minute: 'numeric',
    });

    let formattedStartTime = formatter.format(startTime);
    let formattedEndTime = formatter.format(endTime);

    return formattedStartTime === formattedEndTime
      ? formattedStartTime
      : `${formattedStartTime} - ${formattedEndTime}`;
  }, [booking.event.timeStart, booking.event.timeEnd]);

  return (
    <Flex
      sx={styles.bookingCardContainerCss(
        booking.event.featured ? 'featured' : 'normal',
        index
      )}
      {...rest}
    >
      <Flex sx={styles.bookingCardHeaderCss}>
        <Text variant="heading">{booking.event.title}</Text>
      </Flex>
      <Flex sx={styles.bookingDetailsCss}>
        <IconText variant="event">{eventDate}</IconText>
        <IconText variant="timer">{eventTime}</IconText>
        <IconText variant="group">
          {booking.event.attendees}/{booking.event.maxAttendees}
        </IconText>
        <IconText variant="local-offer">
          {Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'AUD',
          }).format(booking.event.fee)}
        </IconText>
        <IconText variant="place">{`${booking.event.address.street}, ${booking.event.address.city}, ${booking.event.address.state} ${booking.event.address.postcode}`}</IconText>
      </Flex>
    </Flex>
  );
};

export default BookingCard;
