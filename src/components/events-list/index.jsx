/** @jsx jsx */
import { Flex, jsx, Text } from 'theme-ui';
import * as React from 'react';
import * as styles from './index.styles';
import EventCard from '../event-card';
import { useHistory } from 'react-router-dom';

/**
 * Renders a list of event cards
 * @param {Array<Object>} events a list of events
 * @param {string} heading the heading for the event list
 */
const EventsList = ({ events, heading }) => {
  const history = useHistory();

  return (
    events?.length > 0 && (
      <React.Fragment>
        <Text variant="heading" sx={styles.headingCss}>
          {heading}
        </Text>
        <Flex sx={styles.eventsContainerCss}>
          {events.map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              index={index}
              onClick={() => history.push(`/event/${event.id}`)}
            />
          ))}
        </Flex>
      </React.Fragment>
    )
  );
};

export default EventsList;
