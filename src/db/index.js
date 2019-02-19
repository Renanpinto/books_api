import { createConnection, getConnection } from 'typeorm';
import settings from '../config';

class Database {
  constructor(config = settings.db) {
    this.config = config;
  }

  getConnect() {
    return this.getConnection();
  }

  async createQueryRunner() {
    const conn = await this.getConnection();

    return conn.createQueryRunner();
  }


  async getConnection() {
    let connection;

    try {
      connection = await getConnection();
    } catch (error) {
      console.error('GET CONNECTION ERROR: ', error);
      console.info('GET CONNECTION ERROR: ', error);
      connection = await createConnection({ ...this.config });
    }

    return connection;
  }

  async transaction(callback) {
    let result = null;
    let queryRunner;
    let connection;
    let error = null;

    try {
      connection = await this.getConnection();
      queryRunner = await connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      result = await callback(queryRunner);
      await queryRunner.commitTransaction();
    } catch (exception) {
      console.error('TRANSACTION ERROR: ', exception);
      console.info('TRANSACTION ERROR: ', exception);
      error = exception;
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    return { error, result };
  }

  async getRepository(target) {
    const connection = await this.getConnection();

    return connection.getRepository(target);
  }
}

export default Database;
