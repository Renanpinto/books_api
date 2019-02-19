import * as path from 'path';
import TypeOrmConfigFactory from '../orm/typeorm/typeorm-config-factory';

const config = {
  database: process.env.DATABASE_NAME,
  entities: [path.resolve(__dirname, '../../infrastructure/repositories/typeorm/schema/**/index.js')],
  host: process.env.DATABASE_HOST,
  logging: true,
  name: 'default',
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  type: 'postgres',
  username: process.env.DATABASE_USER,
};

const dbConfig = new TypeOrmConfigFactory(config).create();

export default {
  db: dbConfig,
  port: 8082,
};
