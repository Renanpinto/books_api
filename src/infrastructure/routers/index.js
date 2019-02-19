import { createConnection } from 'typeorm';
import settings from '../../config';
import BookRouter from './book';
import GetApiBooksRouter from './book/get-books';

export default async (app) => {
  try {
    await createConnection({ ...settings.db });
  } catch (error) {
    console.info('ERROR: ', error);
    throw new Error(error);
  } finally {
    const basePath = '/api/v1';

    app.use(`${basePath}/book`, BookRouter());
    app.use(`${basePath}/books`, GetApiBooksRouter());
  }

  return app;
};
