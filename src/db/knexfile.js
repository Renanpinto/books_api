const dotenv = require('dotenv');

dotenv.config();

const config = {
  client: 'pg',
  connection: {
    database: process.env.DATABASE_NAME || 'guia',
    host: process.env.DATABASE_HOST || 'localhost',
    password: process.env.DATABASE_PASSWORD || 'root',
    port: process.env.DATABASE_PORT || 5432,
    user: process.env.DATABASE_USER || 'postgres',
  },
  debug: true,
  migrations: {
    directory: 'migrations',
  },
};


module.exports = config;
