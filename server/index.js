const app = require('./app');
const http = require('http');
const logger = require('./utils/logger-utils');

const server = http.createServer(app);

const port = process.env.PORT || 3001;
server.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
