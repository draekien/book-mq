const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const User = require('../models/user');
const Profile = require('../models/profile');

const authUtils = require('../utils/auth-utils');

const api = supertest(app);

describe('Profile API integration tests', () => {
  var token;
  var userId;
  var userId2;

  beforeAll(async () => {
    await User.deleteMany({});
    await Profile.deleteMany({});

    const createdUser1Response = await api
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

    const createdUser2Response = await api
      .post('/api/auth/register')
      .send({
        username: 'Tester3',
        password: 'Tester01',
        firstname: 'Tester3',
        lastname: 'Jones2',
        email: 'tester3.jones2@google.com.au',
      })
      .expect(201)
      .expect('Content-Type', /application\/json/);

    token = createdUser1Response.body.token;
    const token2 = createdUser2Response.body.token;
    const decodedToken = authUtils.getDecodedToken(token);
    const decodedToken2 = authUtils.getDecodedToken(token2);
    userId = decodedToken.id;
    userId2 = decodedToken2.id;
  });

  test('GET / returns profile of provided userId', async () => {
    const profileResponse = await api
      .get('/api/profile')
      .set('authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(profileResponse.body.profile.user._id).toBe(userId);
  });

  test('PATCH / will update profile', async () => {
    const updatedProfileResponse = await api
      .patch('/api/profile')
      .set('authorization', `Bearer ${token}`)
      .send({
        profile: {
          biography: 'test setting bio',
          phoneNumber: '0412345678',
          avatar: 'https://someavatar.com',
        },
      })
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(updatedProfileResponse.body.profile.biography).toBe(
      'test setting bio'
    );
    expect(updatedProfileResponse.body.profile.phoneNumber).toBe('0412345678');
    expect(updatedProfileResponse.body.profile.avatar).toBe(
      'https://someavatar.com'
    );
  });

  test('PATCH /follow will add following user', async () => {
    const updatedProfileResponse = await api
      .patch('/api/profile/follow')
      .set('authorization', `Bearer ${token}`)
      .send({
        followUserId: userId2,
      })
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(updatedProfileResponse.body.profile.follows).toContain(userId2);
  });

  test('PATCH /unfollow will remove following user', async () => {
    const updatedProfileResponse = await api
      .patch('/api/profile/unfollow')
      .set('authorization', `Bearer ${token}`)
      .send({
        followUserId: userId2,
      })
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(updatedProfileResponse.body.profile.follows).toEqual(
      expect.not.arrayContaining([userId2])
    );
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
