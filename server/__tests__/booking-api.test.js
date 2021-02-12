const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const User = require('../models/user');
const Event = require('../models/event');
const Booking = require('../models/booking');

const api = supertest(app);

describe('Booking API integration tests', () => {
  var token;
  var eventId;

  beforeEach(async () => {
    await User.deleteMany({});
    await Event.deleteMany({});
    await Booking.deleteMany({});

    const createUserResponse = await api
      .post('/api/auth/register')
      .send({
        username: 'Tester2',
        password: 'Tester01',
        firstname: 'Tester2',
        lastname: 'Jones2',
        email: 'tester2.jones2@google.com.au',
      })
      .expect(201)
      .expect('Content-Type', /application\/json/);

    token = createUserResponse.body.token;

    const mockEvent = {
      title: 'Title',
      timeStart: new Date(),
      timeEnd: new Date(),
      maxAttendees: 100,
      fee: 20.0,
      address: {
        street: '175 Pitt St',
        city: 'Sydney',
        state: 'NSW',
        postcode: '2000',
      },
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas feugiat arcu arcu, a luctus dui egestas at. In in urna nec felis pretium elementum. Sed ultricies dolor risus, sit amet condimentum diam sagittis in. Sed sit amet erat nisi. Donec ut suscipit purus. Aenean a odio turpis. Nunc vitae malesuada dolor. Morbi eget purus justo. In et lacus id nisl rutrum tempor ac quis massa. Nullam libero quam, tempus at dolor in, fringilla gravida risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    };

    const createdEventResponse = await api
      .post('/api/events')
      .set('authorization', `Bearer ${token}`)
      .send({ event: mockEvent })
      .expect(201)
      .expect('Content-Type', /application\/json/);

    eventId = createdEventResponse.body.event._id;
  });

  test('POST / returns created booking', async () => {
    const mockBooking = {
      event: eventId,
    };

    await api
      .post('/api/bookings')
      .set('authorization', `Bearer ${token}`)
      .send({ booking: mockBooking })
      .expect(201)
      .expect('Content-Type', /application\/json/);
  });

  test('GET / retrieves booking', async () => {
    const mockBooking = {
      event: eventId,
    };

    const createdBookingResponse = await api
      .post('/api/bookings')
      .set('authorization', `Bearer ${token}`)
      .send({ booking: mockBooking })
      .expect(201)
      .expect('Content-Type', /application\/json/);

    await api
      .get(`/api/bookings?id=${createdBookingResponse.body.booking._id}`)
      .set('authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('GET /byevent retrieves all bookings for event', async () => {
    const mockBooking = {
      event: eventId,
    };

    await api
      .post('/api/bookings')
      .set('authorization', `Bearer ${token}`)
      .send({ booking: mockBooking })
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const bookingsResponse = await api
      .get(`/api/bookings/byevent?eventId=${eventId}`)
      .set('authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    console.log(bookingsResponse);
  });

  afterAll(async () => {
    await Booking.deleteMany({});
    mongoose.connection.close();
  });
});
