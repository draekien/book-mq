const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');
const Event = require('../models/event');
const authUtils = require('../utils/auth-utils');

const api = supertest(app);

describe('Event API tests', () => {
  var token;
  var userId;

  beforeEach(async () => {
    await User.deleteMany({});
    await Event.deleteMany({});

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
    const decodedToken = authUtils.getDecodedToken(token);
    userId = decodedToken.id;
  });
  test('GET / returns events as json when authenticated', async () => {
    await api
      .get('/api/events')
      .set('authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('GET / returns unauthorized when no token provided', async () => {
    await api
      .get('/api/events')
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });

  test('GET / returns unauthorized when invalid token provided', async () => {
    await api
      .get('/api/events')
      .set('authorization', 'Bearer invalidtokentesting')
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });

  test('GET /user returns events for user', async () => {
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

    await api
      .post('/api/events')
      .set('authorization', `Bearer ${token}`)
      .send({ event: mockEvent })
      .expect(201)
      .expect('Content-Type', /application\/json/);

    await api
      .get(`/api/events/user?userId=${userId}`)
      .set('authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('GET / with id query returns specific event', async () => {
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

    const eventResponse = await api
      .get(`/api/events?id=${createdEventResponse.body.event._id}`)
      .set('authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(eventResponse.body.events[0]._id).toBe(
      createdEventResponse.body.event._id
    );
  });

  test('POST / returns bad request with no body', async () => {
    await api
      .post('/api/events')
      .set('authorization', `Bearer ${token}`)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  test('POST / returns unauthorized with invalid token', async () => {
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

    await api
      .post('/api/events')
      .set('authorization', `Bearer invalidtokentest`)
      .send({ event: mockEvent })
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });

  test('POST / returns created event if authorized', async () => {
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

    await api
      .post('/api/events')
      .set('authorization', `Bearer ${token}`)
      .send({ event: mockEvent })
      .expect(201)
      .expect('Content-Type', /application\/json/);
  });

  test('PATCH /:id returns updated event if authorized', async () => {
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

    const eventUpdate = {
      fee: 45.9,
      title: 'updated title',
    };

    const createdEventResponse = await api
      .post('/api/events')
      .set('authorization', `Bearer ${token}`)
      .send({ event: mockEvent })
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const updatedEventResponse = await api
      .patch(`/api/events/${createdEventResponse.body.event._id}`)
      .set('authorization', `Bearer ${token}`)
      .send({ event: eventUpdate })
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  afterAll(async () => {
    await Event.deleteMany({});
    mongoose.connection.close();
  });
});
