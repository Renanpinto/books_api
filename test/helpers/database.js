import * as path from 'path';

const knexBuilder = require('knex');
const uuid = require('uuid/v4');

/* eslint-disable */
if (process.env.NODE_ENV != 'local') {
  const dotenv = require('dotenv');

  dotenv.config();
}

class TestDatabase {
  constructor() {
    this.databaseName = `globalsales_availability_${uuid()}`.replace(/-/g, '');
  }

  async setup() {
    this.knex = knexBuilder(this.knexConfig(this.databaseName));
    this.knexDatabaseCreator = knexBuilder(this.knexConfig('postgres'));

    await this.knexDatabaseCreator.raw(`CREATE DATABASE ${this.databaseName}`);
    await this.knex.migrate.latest();
    await this.knex.seed.run();
  }

  async cleanUpAllTestDatabases() {
    let knex;

    try {
      knex = knexBuilder(this.knexConfig('postgres'));
      const queryResult = await knex
        .raw('SELECT datname FROM pg_database WHERE datistemplate = false');

      const testDatabases = queryResult
        .rows
        .filter(itemF => itemF.datname.startsWith('globalsales_availability_'))
        .map(itemM => itemM.datname);

      // eslint-disable-next-line no-console
      console.log('Dropping databases %j', testDatabases);

      await Promise.all(testDatabases.map(database => knex.raw(`DROP DATABASE ${database}`)));
    } finally {
      if (knex) knex.destroy();
    }
  }

  executeRawQuery(query) {
    return this.knex.raw(query);
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

  bookshelfConfig() {
    return this.knexConfig(this.databaseName);
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
      seeds: {
        directory: 'src/db/seeds',
      },
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

    const typeOrm = new External.TypeOrmConfigFactory(config).create();

    delete typeOrm.logger;

    return typeOrm;
  }
}

module.exports = TestDatabase;