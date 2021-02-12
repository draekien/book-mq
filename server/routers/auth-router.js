const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const config = require('../utils/config-utils');
const authUtils = require('../utils/auth-utils');
const object = require('../utils/object-utils');
const userService = require('../services/user-service');

var router = express.Router();

/**
 * @swagger
 *
 * /api/auth:
 *  post:
 *    summary: Authenticates a username and password
 *    tags: ['api/auth']
 *    produces:
 *      - application/json
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              -username
 *              -password
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *                format: password
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              required:
 *                - token
 *                - expires
 *              properties:
 *                token:
 *                  type: string
 *                  description: access token
 *                expires:
 *                  type: number
 *                  description: expiry datetime
 *      400:
 *        description: Bad Request
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Internal Server Error
 */
router.post('/', async (req, res) => {
  const body = req.body;

  if (object.isEmpty(body)) {
    return res.status(400).json({ error: 'body missing' });
  }
  // lets mock a user for testing for now
  let user = await userService.getByUsername(body.username);

  if (!user) {
    return res.status(401).json({ error: 'User does not exist' });
  }

  const isAuthenticated = await bcrypt.compare(body.password, user.password);

  if (!isAuthenticated) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  const tokenData = {
    id: user._id,
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
  };

  const token = jwt.sign(tokenData, config.JWT_SECRET, {
    expiresIn: '1d',
  });

  return res.json({ token });
});

/**
 * @swagger
 *
 * /api/auth/register:
 *  post:
 *    summary: Registers a new user account
 *    tags: ['api/auth']
 *    produces:
 *      - application/json
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              -username
 *              -password
 *              -firstname
 *              -lastname
 *              -email
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *                format: password
 *              firstname:
 *                type: string
 *              lastname:
 *                type: string
 *              email:
 *                type: string
 *    responses:
 *      201:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              required:
 *                - token
 *                - expires
 *              properties:
 *                token:
 *                  type: string
 *                  description: access token
 *                expires:
 *                  type: number
 *                  description: expiry datetime
 *      400:
 *        description: Bad Request
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Internal Server Error
 */
router.post('/register', async (req, res) => {
  const body = req.body;

  if (object.isEmpty(body)) {
    return res.status(400).json({ error: 'body missing' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = {
    username: body.username,
    password: passwordHash,
    firstname: body.firstname,
    lastname: body.lastname,
    email: body.email,
  };

  let createdUser = await userService.create(user);

  const tokenData = {
    id: createdUser._id,
    username: createdUser.username,
    firstname: createdUser.firstname,
    lastname: createdUser.lastname,
    email: createdUser.email,
  };
  const token = jwt.sign(tokenData, config.JWT_SECRET, {
    expiresIn: '1d',
  });

  return res.status(201).json({ token });
});

/**
 * @swagger
 *
 * /api/auth/token:
 *  post:
 *    summary: Validates a bearer token
 *    tags: ['api/auth']
 *    produces:
 *      - application/json
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              required:
 *                - token
 *                - expires
 *              properties:
 *                token:
 *                  type: string
 *                  description: access token
 *                expires:
 *                  type: number
 *                  description: expiry datetime
 *      400:
 *        description: Bad Request
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Internal Server Error
 */
router.post('/token', async (req, res) => {
  if (!req.headers) {
    return res.status(400).json({ error: 'headers missing' });
  }

  const token = authUtils.getTokenFrom(req);
  const decodedToken = authUtils.getDecodedToken(token);

  if (decodedToken === null) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  // validate user in token to db entry
  let user = await userService.getById(decodedToken.id);

  if (!user) {
    return res.status(404).json({ error: 'User does not exist' });
  }

  // refresh the token
  const tokenData = {
    id: user._id,
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
  };
  const refreshedToken = jwt.sign(tokenData, config.JWT_SECRET, {
    expiresIn: '1d',
  });

  return res.json({ token: refreshedToken });
});

module.exports = router;
