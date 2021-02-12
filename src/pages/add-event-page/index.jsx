/** @jsx jsx */
import { Flex, jsx, Text } from 'theme-ui';
import * as React from 'react';
import HeroLayout from '../../layouts/hero-layout';
import InputGroup from '../../components/input-group';
import * as styles from './index.styles';
import * as EventService from '../../services/event-service';
import { useHistory } from 'react-router-dom';
import CustomButton from '../../components/custom-button';
import { ToastContext } from '../../components/toasts/toast.context';

const AddEventPage = () => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [maxAttendees, setMaxAttendees] = React.useState(0);
  const [fee, setFee] = React.useState(0);
  const [date, setDate] = React.useState('');
  const [startTime, setStartTime] = React.useState('');
  const [endTime, setEndTime] = React.useState('');
  const [street, setStreet] = React.useState('');
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
  const [postcode, setPostcode] = React.useState('');
  const [saving, setSaving] = React.useState(false);

  const toastContext = React.useContext(ToastContext);

  const history = useHistory();

  const handleAddEvent = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      let timeStart = new Date(Date.parse(date));
      timeStart.setHours(startTime.split(':')[0]);
      timeStart.setMinutes(startTime.split(':')[1]);

      let timeEnd = new Date(Date.parse(date));
      timeEnd.setHours(endTime.split(':')[0]);
      timeEnd.setMinutes(endTime.split(':')[1]);
      const savedEvent = await EventService.create({
        title,
        description,
        maxAttendees,
        address: {
          street,
          city,
          state,
          postcode,
        },
        timeStart,
        timeEnd,
        fee,
        featured: false,
      });
      toastContext.success({
        title: 'success',
        message: 'New event saved!',
      });
      history.push(`/event/${savedEvent._id}`);
    } catch (error) {
      toastContext.error({
        title: 'error',
        message: 'Failed to save a new event',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <HeroLayout
      hero={
        <Flex sx={styles.heroContainerCss}>
          <Text variant="heading">Event Management</Text>
          <Text variant="default">
            Name and add details to your event like your schedule, sponsors, or
            featured guests
          </Text>
        </Flex>
      }
    >
      <form onSubmit={handleAddEvent} sx={styles.formCss}>
        <Text variant="heading" sx={{ mt: 'sm' }}>
          Event Details
        </Text>
        <InputGroup
          label="Event Title"
          name="event-title"
          id="event-title"
          type="text"
          labelColor="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <InputGroup
          label="Description"
          name="description"
          id="description"
          type="text"
          variant="multi-line"
          labelColor="text"
          value={description}
          rows={5}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Flex sx={styles.formRowCss}>
          <InputGroup
            label="Maximum number of attendees"
            name="max-attendees"
            id="max-attendees"
            type="number"
            labelColor="text"
            min="1"
            value={maxAttendees}
            onChange={(e) => setMaxAttendees(e.target.value)}
            required
          />
          <InputGroup
            label="Price"
            name="fee"
            id="fee"
            type="number"
            min="0"
            step="0.05"
            labelColor="text"
            iconVariant="attach-money"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
            required
          />
        </Flex>
        <Text variant="default" sx={{ mt: 'md' }}>
          Tell event-goers when your event starts and ends so they can make
          plans to attend.
        </Text>
        <Flex sx={styles.formRowCss}>
          <InputGroup
            label="Date"
            name="date"
            id="date"
            type="date"
            labelColor="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <InputGroup
            label="Start Time"
            name="start-time"
            id="start-time"
            type="time"
            labelColor="text"
            value={startTime}
            onChange={(e) => {
              let time = e.target.value;
              let hours = parseInt(time.split(':')[0]);
              if (hours < 23) {
                hours += 1;
              } else {
                hours = '00';
              }
              let minutes = time.split(':')[1];
              setStartTime(e.target.value);
              setEndTime(`${hours}:${minutes}`);
            }}
            required
          />
          <InputGroup
            label="End Time"
            name="end-time"
            id="end-time"
            type="time"
            labelColor="text"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </Flex>
        <Text variant="default" sx={{ mt: 'md' }}>
          Let attendees know where to show up
        </Text>
        <Flex sx={{ flexDirection: 'column' }}>
          <InputGroup
            label="Street number and name"
            name="street"
            id="street"
            type="text"
            labelColor="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
          />
          <Flex sx={styles.formRowCss}>
            <InputGroup
              label="City"
              name="city"
              id="city"
              type="text"
              labelColor="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <InputGroup
              label="State"
              name="state"
              id="state"
              type="text"
              labelColor="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
            <InputGroup
              label="Postcode"
              name="postcode"
              id="postcode"
              type="text"
              labelColor="text"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              required
            />
          </Flex>
        </Flex>
        <CustomButton
          variant="solid"
          type="submit"
          isLoading={saving}
          onClick={handleAddEvent}
          sx={styles.submitBtnCss}
        >
          Submit
        </CustomButton>
      </form>
    </HeroLayout>
  );
};

export default AddEventPage;
