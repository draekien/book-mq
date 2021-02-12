/** @jsx jsx */
import { Flex, jsx, Text } from 'theme-ui';
import * as React from 'react';
import IconText from '../icon-text';
import * as styles from './index.styles';
import AuthContext from '../../security/auth.context';

/**
 * Renders an event card
 * @param {object} event an event
 * @param {number} index determines direction of gradient
 */
const EventCard = ({ event, index, ...rest }) => {
  const [isAttending, setIsAttending] = React.useState(false);
  const [isOwner, setIsOwner] = React.useState(false);
  const [{ user }] = React.useContext(AuthContext);

  React.useEffect(() => {
    if (
      event.bookings !== [] &&
      event.bookings.filter((booking) => booking.user._id === user.id).length >
        0
    ) {
      setIsAttending(true);
    }

    if (event.user._id === user.id) {
      setIsOwner(true);
    }
  }, [event, user]);

  const eventDate = React.useMemo(() => {
    let date = new Date(Date.parse(event.timeStart));
    console.log(date);
    return date.toLocaleDateString();
  }, [event.timeStart]);

  const eventTime = React.useMemo(() => {
    let startTime = new Date(Date.parse(event.timeStart));
    let endTime = new Date(Date.parse(event.timeEnd));
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
  }, [event.timeStart, event.timeEnd]);

  return (
    <Flex
      sx={styles.eventCardContainerCss(
        event.featured ? 'featured' : 'normal',
        index
      )}
      {...rest}
    >
      <Flex sx={styles.eventCardHeaderCss}>
        <Text variant="heading">{event.title}</Text>
        {(isAttending || isOwner) && (
          <Text variant="subtitle">
            {isAttending && 'ATTENDING'} {isOwner && '| OWNER'}
          </Text>
        )}
      </Flex>
      <Flex sx={styles.eventDetailsCss}>
        <IconText variant="event">{eventDate}</IconText>
        <IconText variant="timer">{eventTime}</IconText>
        <IconText variant="group">
          {event.attendees}/{event.maxAttendees}
        </IconText>
        <IconText variant="local-offer">
          {Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'AUD',
          }).format(event.fee)}
        </IconText>
        <IconText variant="place">{`${event.address.street}, ${event.address.city}, ${event.address.state} ${event.address.postcode}`}</IconText>
      </Flex>
    </Flex>
  );
};

export default EventCard;
