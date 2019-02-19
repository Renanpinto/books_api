import express from 'express';
import bodyParser from 'body-parser';
import buildRoutes from './infrastructure/routers';

const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

buildRoutes(app).then((server) => {
  server.listen(PORT, () => {
    console.log(`LIVE on port ${PORT}`);
  });
}).catch((error) => {
  console.error('ERROR: ', error);
});
