const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../utils/config-utils');

const api = supertest(app);

describe('Authentication API tests', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await api
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
  });

  test('POST /register returns created user as json', async () => {
    await api
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
  });

  test('POST /token returns retrieved user if token is valid', async () => {
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

    let tokenForTesting = createUserResponse.body.token;
    await api
      .post('/api/auth/token')
      .set('authorization', `Bearer ${tokenForTesting}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('POST /token returns unauthorized if token is expired', async () => {
    const token = jwt.sign(
      { id: 'testing', username: 'testing' },
      config.JWT_SECRET,
      { expiresIn: 0 }
    );

    await api
      .post('/api/auth/token')
      .set('authorization', `Bearer ${token}`)
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });

  test('POST / returns retrieved user if username and password matches', async () => {
    await api
      .post('/api/auth')
      .send({ username: 'Tester', password: 'Tester01' })
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('POST / returns unauthorized if username does not match', async () => {
    const response = await api
      .post('/api/auth')
      .send({ username: 'SadUsername', password: 'SadPassword' })
      .expect(401);

    expect(response.body.error).toBe('User does not exist');
  });

  test('POST / returns unauthorized if password does not match', async () => {
    const response = await api
      .post('/api/auth')
      .send({ username: 'Tester2', password: 'SadPassword' })
      .expect(401);

    expect(response.body.error).toBe('Invalid password');
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
