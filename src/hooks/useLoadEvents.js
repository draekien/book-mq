import * as React from 'react';
import EventService from '../services/event-service';

/**
 * Custom hook for loading events
 * @param {string} userId optional - a userId to load events for
 * @returns {object} loading, featured, normal
 */
const useLoadEvents = (userId) => {
  const [{ featured, normal }, setEvents] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadEvents() {
      try {
        let events;

        if (!userId) {
          events = await EventService.getAll();
        } else {
          events = await EventService.getByUser(userId);
        }

        setEvents({
          featured: {
            future: events.filter((e) => IsFutureEvent(e) && e.featured),
            past: events.filter((e) => !IsFutureEvent(e) && e.featured),
          },
          normal: {
            future: events.filter((e) => IsFutureEvent(e) && !e.featured),
            past: events.filter((e) => !IsFutureEvent(e) && !e.featured),
          },
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, [userId]);

  return { loading, featured, normal };
};

const IsFutureEvent = (event) => {
  return new Date(Date.parse(event.timeStart)) >= Date.now();
};

export default useLoadEvents;
