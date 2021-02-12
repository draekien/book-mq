const express = require('express');
const auth = require('../middleware/auth');

const eventService = require('../services/event-service');

const authUtils = require('../utils/auth-utils');
const object = require('../utils/object-utils');

const Event = require('../models/event');

var router = express.Router();

/**
 * @swagger
 *
 * /api/events:
 *  get:
 *    summary: Gets all events
 *    tags: ['api/events']
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
 *                - events
 *              properties:
 *                events:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/event'
 *      401:
 *        description: token missing or invalid
 *      500:
 *        description: internal server error
 */
router.get('/', auth, async (req, res) => {
  let events;
  if (req.query.id) {
    events = await eventService.getById(req.query.id);
  } else {
    events = await eventService.getAll();
  }

  return res.json({ events });
});

/**
 * @swagger
 *
 * /api/events/user:
 *  get:
 *    summary: Gets all events
 *    tags: ['api/events']
 *    produces:
 *      - application/json
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: userId
 *        description: id of the user to retrieve events for
 *        type: string
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              required:
 *                - events
 *              properties:
 *                events:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/event'
 *      401:
 *        description: token missing or invalid
 *      500:
 *        description: internal server error
 */
router.get('/user', auth, async (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.redirect('/api/events');
  }

  const events = await eventService.getByUserId(userId);

  return res.json({ events });
});

/**
 * @swagger
 *
 * /api/events:
 *  post:
 *    summary: Create an event
 *    tags: ['api/events']
 *    produces:
 *      - application/json
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/event'
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              required:
 *                - event
 *              properties:
 *                event:
 *                  description: the created event
 *                  $ref: '#/components/schemas/eventUpdate'
 *      400:
 *        description: body missing
 *      401:
 *        description: token missing or invalid
 *      500:
 *        description: internal server error
 */
router.post('/', async (req, res) => {
  const body = req.body;

  if (object.isEmpty(body)) {
    return res.status(400).json({ error: 'body missing' });
  }

  const token = authUtils.getTokenFrom(req);
  const decodedToken = authUtils.getDecodedToken(token);

  if (decodedToken === null) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  let eventToCreate = {
    ...body.event,
    user: decodedToken.id,
  };

  const createdEvent = await eventService.create(eventToCreate);

  return res.status(201).json({ event: createdEvent });
});

/**
 * @swagger
 *
 * /api/events:
 *  patch:
 *    summary: Create an event
 *    tags: ['api/events']
 *    produces:
 *      - application/json
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: id
 *        description: ID of the event to patch
 *        required: true
 *        in: path
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/event'
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              required:
 *                - event
 *              properties:
 *                event:
 *                  description: the updated event
 *                  $ref: '#/components/schemas/event'
 *      400:
 *        description: body missing
 *      401:
 *        description: token missing or invalid
 *      500:
 *        description: internal server error
 */
router.patch('/:id', auth, async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  if (object.isEmpty(body)) {
    return res.status(400).json({ error: 'body missing' });
  }

  const updatedEvent = await Event.findByIdAndUpdate(id, body.event, {
    useFindAndModify: false,
    new: true,
  });

  return res.json({ event: updatedEvent });
});

router.delete('/:id', auth, async (req, res) => {
  const id = req.params.id;

  await Event.findByIdAndUpdate(
    id,
    { deleted: true },
    { useFindAndModify: false }
  );

  return res.status(204).end();
});

module.exports = router;
