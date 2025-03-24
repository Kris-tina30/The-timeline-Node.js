const express = require('express');
const pino = require('pino-http');
const cors = require('cors');
const router = require('./routes');
const path = require('path');
const getEnvVar = require('./utils/getEnvVar');
const PORT = Number(getEnvVar('PORT', '2000'));

const startServer = () => {
  const app = express();

  app.use(express.static(path.join(__dirname, '../public')));

  //ejs
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '../src/views'));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use('/', router);

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

module.exports = startServer;
