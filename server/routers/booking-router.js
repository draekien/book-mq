const express = require('express');
const auth = require('../middleware/auth');

const authUtils = require('../utils/auth-utils');
const object = require('../utils/object-utils');
const bookingService = require('../services/booking-service');

var router = express.Router();

/**
 * @swagger
 *
 * /api/bookings:
 *  get:
 *    summary: Gets a booking by id
 *    tags: ['api/bookings']
 *    produces:
 *      - application/json
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: id
 *        description: ID of the booking to find
 *        required: true
 *        in: path
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              required:
 *                - booking
 *              properties:
 *                booking:
 *                  $ref: '#/components/schemas/booking'
 *      401:
 *        description: token missing or invalid
 *      500:
 *        description: internal server error
 */
router.get('/', auth, async (req, res) => {
  const bookingId = req.query.id;

  if (!bookingId) {
    return res.status(400).json({ error: 'booking id missing' });
  }

  const booking = await bookingService.getById(bookingId);

  if (object.isEmpty(booking)) {
    return res.status(404).json({ error: 'booking not found' });
  }

  return res.json({ booking });
});

router.get('/byuser', async (req, res) => {
  const token = authUtils.getTokenFrom(req);
  const decodedToken = authUtils.getDecodedToken(token);

  if (decodedToken === null) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  const bookings = await bookingService.getByUserId(decodedToken.id);

  return res.json({ bookings });
});

router.get('/byevent', auth, async (req, res) => {
  const eventId = req.query.eventId;

  if (!eventId) {
    return res.status(400).json({ error: 'event id is missing' });
  }

  const bookings = await bookingService.getByEventId(eventId);

  if (object.isEmpty(bookings)) {
    return res.status(404).json({ error: 'bookings not found' });
  }

  return res.json({ bookings });
});

/**
 * @swagger
 *
 * /api/bookings:
 *  post:
 *    summary: Creates a new booking
 *    tags: ['api/bookings']
 *    produces:
 *      - application/json
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/booking'
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              required:
 *                - booking
 *              properties:
 *                booking:
 *                  $ref: '#/components/schemas/booking'
 *      401:
 *        description: token missing or invalid
 *      500:
 *        description: internal server error
 */
router.post('/', async (req, res) => {
  if (!req.headers) {
    return res.status(400).json({ error: 'headers missing' });
  }

  const token = authUtils.getTokenFrom(req);
  const decodedToken = authUtils.getDecodedToken(token);

  if (decodedToken === null) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  const body = req.body;
  if (object.isEmpty(body)) {
    return res.status(400).json({ error: 'body missing' });
  }

  let bookingToCreate = {
    ...body.booking,
    user: decodedToken.id,
  };

  const createdBooking = await bookingService.create(bookingToCreate);

  return res.status(201).json({ booking: createdBooking });
});

router.delete('/', async (req, res) => {
  if (!req.headers) {
    return res.status(400).json({ error: 'headers missing' });
  }

  const token = authUtils.getTokenFrom(req);
  const decodedToken = authUtils.getDecodedToken(token);

  if (decodedToken === null) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ error: 'booking id missing' });
  }

  const deleted = await bookingService.cancel(id, decodedToken.id);

  return deleted
    ? res.status(204).end()
    : res.status(500).json({ error: 'unable to delete booking' });
});

module.exports = router;
