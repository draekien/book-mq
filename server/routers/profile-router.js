const express = require('express');

const profileService = require('../services/profile-service');

const authUtils = require('../utils/auth-utils');
const object = require('../utils/object-utils');

var router = express.Router();

/**
 * @swagger
 *
 * /api/profile:
 *  get:
 *    summary: Get a profile by user id
 *    tags: ['api/profile']
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
 *              $ref: '#/components/schemas/profile'
 *      401:
 *        description: unauthorized
 *      404:
 *        description: profile not found
 *      500:
 *        description: internal server error
 */
router.get('/', async (req, res) => {
  const userId = req.query.userId;
  const token = authUtils.getTokenFrom(req);
  const decodedToken = authUtils.getDecodedToken(token);

  if (decodedToken === null) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  const profile = await profileService.getByUserId(userId || decodedToken.id);

  if (!profile || object.isEmpty(profile)) {
    return res.status(404).json({ error: 'Profile not found' });
  }

  return res.json({ profile });
});

/**
 * @swagger
 *
 * /api/profile:
 *  patch:
 *    summary: Update a profile
 *    tags: ['api/profile']
 *    produces:
 *      - application/json
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              biography:
 *                type: string
 *              phoneNumber:
 *               type: string
 *              avatar:
 *               type: string
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/profile'
 *      401:
 *        description: unauthorized
 *      404:
 *        description: profile not found
 *      500:
 *        description: internal server error
 */
router.patch('/', async (req, res) => {
  const body = req.body;

  if (object.isEmpty(body)) {
    return res.status(400).json({ error: 'body missing' });
  }

  const token = authUtils.getTokenFrom(req);
  const decodedToken = authUtils.getDecodedToken(token);

  if (decodedToken === null) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  const updatedProfile = await profileService.update(
    decodedToken.id,
    body.profile
  );

  if (object.isEmpty(updatedProfile)) {
    return res.status(500).json({ error: 'unable to update profile' });
  }

  return res.json({ profile: updatedProfile });
});

/**
 * @swagger
 *
 * /api/profile/follow:
 *  patch:
 *    summary: Follow a user
 *    tags: ['api/profile']
 *    produces:
 *      - application/json
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              followUserId:
 *                type: string
 *                description: UserId of user to follow
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/profile'
 *      401:
 *        description: unauthorized
 *      404:
 *        description: profile not found
 *      500:
 *        description: internal server error
 */
router.patch('/follow', async (req, res) => {
  const body = req.body;

  if (object.isEmpty(body)) {
    return res.status(400).json({ error: 'body missing' });
  }

  const token = authUtils.getTokenFrom(req);
  const decodedToken = authUtils.getDecodedToken(token);

  if (decodedToken === null) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  const updatedProfile = await profileService.follow(
    decodedToken.id,
    body.followUserId
  );

  if (object.isEmpty(updatedProfile)) {
    return res.status(500).json({ error: 'unable to update profile' });
  }

  return res.json({ profile: updatedProfile });
});
/**
 * @swagger
 *
 * /api/profile/unfollow:
 *  patch:
 *    summary: Unfollow a user
 *    tags: ['api/profile']
 *    produces:
 *      - application/json
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              followUserId:
 *                type: string
 *                description: UserId of user to follow
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/profile'
 *      401:
 *        description: unauthorized
 *      404:
 *        description: profile not found
 *      500:
 *        description: internal server error
 */
router.patch('/unfollow', async (req, res) => {
  const body = req.body;

  if (object.isEmpty(body)) {
    return res.status(400).json({ error: 'body missing' });
  }

  const token = authUtils.getTokenFrom(req);
  const decodedToken = authUtils.getDecodedToken(token);

  if (decodedToken === null) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  const updatedProfile = await profileService.unfollow(
    decodedToken.id,
    body.followUserId
  );

  if (object.isEmpty(updatedProfile)) {
    return res.status(500).json({ error: 'unable to update profile' });
  }

  return res.json({ profile: updatedProfile });
});

module.exports = router;
