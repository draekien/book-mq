/** @jsx jsx */
import { Avatar, Box, Flex, jsx, Text } from 'theme-ui';
import * as React from 'react';
import HeroLayout from '../../layouts/hero-layout';
import IconText from '../../components/icon-text';
import CustomButton from '../../components/custom-button';
import * as ReactIcon from 'react-icons/md';
import * as EventService from '../../services/event-service';
import * as styles from './index.styles';
import { useHistory, useParams } from 'react-router-dom';
import ProfileService from '../../services/profile-service';
import BookingService from '../../services/booking-service';
import AuthContext from '../../security/auth.context';
import { ToastContext } from '../../components/toasts/toast.context';
import UserList from '../../components/user-list';

const EventPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [event, setEvent] = React.useState({});
  const [profile, setProfile] = React.useState({});
  const [isAttending, setIsAttending] = React.useState(false);
  const [bookingLoading, setBookingLoading] = React.useState(false);
  const [promoteLoading, setPromoteLoading] = React.useState(false);
  const [isOwner, setIsOwner] = React.useState(false);
  const [{ user }] = React.useContext(AuthContext);
  const toast = React.useContext(ToastContext);
  const history = useHistory();

  React.useEffect(() => {
    async function loadEvent() {
      try {
        let event = await EventService.getById(id);
        setEvent(event);

        if (user?.id === event.user?._id) {
          setIsOwner(true);
        }

        let profile = await ProfileService.getByUserId(event.user._id);
        setProfile(profile);

        if (
          event.bookings.filter((booking) => booking.user._id === user?.id)
            .length > 0
        ) {
          setIsAttending(true);
        }
      } catch (error) {
        toast.error({
          title: 'error',
          message: 'Failed to load event',
        });
      } finally {
        setLoading(false);
      }
    }
    loadEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, bookingLoading, user]);

  const eventDate = React.useMemo(() => {
    if (!loading && event?.timeStart) {
      let date = new Date(Date.parse(event.timeStart));
      return date.toLocaleDateString();
    }
  }, [loading, event]);

  const eventTime = React.useMemo(() => {
    if (!loading && event?.timeStart && event?.timeEnd) {
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
    }
  }, [loading, event]);

  const handleAddBooking = async () => {
    try {
      setBookingLoading(true);
      if (event.bookings.length < event.maxAttendees) {
        await BookingService.create({
          event: event.id,
        });
        toast.success({
          title: 'success',
          message: 'Successfully added booking to event',
        });
      } else {
        toast.alert({
          title: 'warning',
          message: 'Event has reached maximum capacity',
        });
      }
    } catch (error) {
      toast.error({
        title: 'error',
        message: 'Failed to add booking to event',
      });
    } finally {
      setBookingLoading(false);
    }
  };

  const handlePromoteEvent = async (e) => {
    e.preventDefault();

    try {
      setPromoteLoading(true);
      const updatedEvent = await EventService.update(event._id, {
        featured: true,
      });
      setEvent(updatedEvent);
      toast.success({
        title: 'success',
        message: 'Event promoted',
      });
    } catch (error) {
      toast.error({
        title: 'error',
        message: 'Failed to promote event',
      });
    } finally {
      setPromoteLoading(false);
    }
  };

  if (!event || event === {}) {
    return (
      <Flex sx={styles.descriptionContainerCss}>
        <Text variant="hero" sx={styles.heroHeadingCss}>
          404 Event Not Found
        </Text>
      </Flex>
    );
  }

  return (
    <HeroLayout
      isLoading={loading}
      hero={
        !loading && (
          <Flex sx={styles.heroContainerCss}>
            <Text variant="heading" sx={styles.heroHeadingCss}>
              {event.title}
            </Text>
            <Flex sx={styles.eventDetailsContainerCss}>
              <Flex sx={styles.eventDetailsCss}>
                <Box>
                  <Text variant="default" sx={{ pb: 'xs' }}>
                    Details
                  </Text>
                  <Flex sx={{ flexWrap: 'wrap' }}>
                    <IconText variant="event">{eventDate}</IconText>
                    <IconText variant="timer">{eventTime}</IconText>
                    <IconText variant="group">
                      {event.attendees}/{event.maxAttendees}
                    </IconText>
                    <IconText variant="local-offer">
                      {Intl.NumberFormat('default', {
                        style: 'currency',
                        currency: 'AUD',
                      }).format(event.fee)}
                    </IconText>
                  </Flex>
                </Box>
                <Box>
                  <Text variant="default" sx={{ pb: 'xs' }}>
                    Location
                  </Text>
                  <IconText variant="place">
                    {`${event.address.street}, ${event.address.city} ${event.address.state} ${event.address.postcode}`}
                  </IconText>
                </Box>
              </Flex>
              <Flex sx={styles.hostContainerCss}>
                <Box sx={styles.avatarContainerCss}>
                  <Avatar src={profile.avatar} sx={styles.avatarCss} />
                </Box>
                <CustomButton
                  variant="text"
                  onClick={() => {
                    history.push(`/profile/${event.user._id}`);
                  }}
                >
                  {event.user.username}
                </CustomButton>
              </Flex>
            </Flex>
          </Flex>
        )
      }
    >
      <Flex sx={styles.descriptionContainerCss}>
        <Text variant="heading" sx={styles.descriptionHeadingCss}>
          Description
        </Text>
        <Text variant="default">{event.description}</Text>
        {!isOwner ? (
          <CustomButton
            variant="solid"
            onClick={handleAddBooking}
            isLoading={bookingLoading}
            disabled={isAttending}
            sx={styles.attendButtonCss}
          >
            <Text>{isAttending ? 'Attending' : 'Attend'}</Text>
            {!isAttending && <ReactIcon.MdArrowForward />}
          </CustomButton>
        ) : (
          new Date(Date.parse(event.timeStart)) >= Date.now() && (
            <CustomButton
              variant="gradient"
              onClick={handlePromoteEvent}
              isLoading={promoteLoading}
              disabled={event.featured}
              sx={styles.attendButtonCss}
            >
              <Text>{event.featured ? 'featured' : 'promote'}</Text>
            </CustomButton>
          )
        )}
        {event.bookings && (
          <React.Fragment>
            <Text variant="heading" sx={styles.attendeesHeadingCss}>
              Attendees
            </Text>
            {event.bookings.length > 0 ? (
              <UserList users={event.bookings.map((booking) => booking.user)} />
            ) : (
              <Text variant="default">
                looks like nobody's attending this event just yet...
              </Text>
            )}
          </React.Fragment>
        )}
      </Flex>
    </HeroLayout>
  );
};

export default EventPage;
