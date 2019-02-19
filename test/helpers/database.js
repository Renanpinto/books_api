import * as path from 'path';
import TypeOrmConfigFactory from '../../src/config/orm/typeorm/typeorm-config-factory';

const knexBuilder = require('knex');
const uuid = require('uuid/v4');

/* eslint-disable */
const dotenv = require('dotenv');

dotenv.config();

class TestDatabase {
  constructor() {
    this.databaseName = `book_${uuid()}`.replace(/-/g, '');
  }

  async setup() {
    this.knex = knexBuilder(this.knexConfig(this.databaseName));
    this.knexDatabaseCreator = knexBuilder(this.knexConfig('postgres'));

    await this.knexDatabaseCreator.raw(`CREATE DATABASE ${this.databaseName}`);
    await this.knex.migrate.latest();
  }

  async teardown() {
    if (this.knex) {
      await this.knex.destroy();
    }

    if (this.knexDatabaseCreator) {
      await this.knexDatabaseCreator.raw(`DROP DATABASE IF EXISTS ${this.databaseName}`);
      await this.knexDatabaseCreator.destroy();
    }
  }

  knexConfig(databaseName) {
    return {
      client: 'pg',
      connection: {
        database: databaseName,
        host: process.env.DATABASE_HOST,
        name: 'default',
        password: process.env.DATABASE_PASSWORD,
        port: process.env.DATABASE_PORT,
        user: process.env.DATABASE_USER,
      },
      debug: false,
      migrations: {
        directory: 'src/db/migrations',
      },
      pool: { max: 1, min: 0 },
    };
  }

  typeOrmConfig() {
    const config = {
      database: this.databaseName,
      entities: [
        path.resolve(__dirname, '../../src/infrastructure/repositories/typeorm/schema/**/index.js'),
      ],
      host: process.env.DATABASE_HOST,
      logging: false,
      name: 'default',
      password: process.env.DATABASE_PASSWORD,
      port: process.env.DATABASE_PORT,
      type: 'postgres',
      username: process.env.DATABASE_USER,
    };

    const typeOrm = new TypeOrmConfigFactory(config).create();

    delete typeOrm.logger;

    return typeOrm;
  }
}

module.exports = TestDatabase;