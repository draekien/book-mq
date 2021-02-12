import * as React from 'react';
import BookingService from '../services/booking-service';

/**
 * Loads the currently logged in user's bookings
 * @returns {object} loading, future, past
 */
const useLoadMyBookings = () => {
  const [{ future, past }, setBookings] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadBookings() {
      try {
        let bookings = await BookingService.getForCurrentUser();
        setBookings({
          future: bookings.filter((b) => IsFutureBooking(b)),
          past: bookings.filter((b) => !IsFutureBooking(b)),
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadBookings();
  }, []);

  return { loading, future, past };
};

const IsFutureBooking = (booking) => {
  return new Date(Date.parse(booking.event.timeStart)) >= Date.now();
};

export default useLoadMyBookings;
