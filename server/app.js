const express = require('express');
require('express-async-errors');
const mongoose = require('mongoose');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const config = require('./utils/config-utils');
const logger = require('./utils/logger-utils');

const url = config.MONGO_URI;

// routers
const authRouter = require('./routers/auth-router');
const bookingRouter = require('./routers/booking-router');
const eventRouter = require('./routers/event-router');
const profileRouter = require('./routers/profile-router');

// middleware
const unknownEndpoint = require('./middleware/unknown-endpoint');

//#region swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'API',
      version: '1.0.0',
      description: 'API documentation',
      servers: ['http://localhost:3001'],
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    openapi: '3.0.0',
  },
  apis: ['server/routers/*.js', 'server/models/**/*.js', 'server/index.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
//#endregion

// app
const app = express();

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB', error.message);
  });

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());
app.use(express.static(path.resolve('build')));

// routers
app.use('/api/auth', authRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/events', eventRouter);
app.use('/api/profile', profileRouter);

// fallback
app.get('*', (_, res) => {
  res.sendFile(path.resolve('build', 'index.html'));
});

// middleware
app.use(unknownEndpoint);

module.exports = app;
