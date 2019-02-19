import express from 'express';
import buildHandler from '../handler';
import BookFactory from '../../factories/book/book-factory';
import GetAllBooksFactory from '../../factories/book/get-all-factory';
import GetByIdBooksFactory from '../../factories/book/get-by-id-factory';
import BookHandler from '../../http/book/book-handler';

const bookRouter = express.Router();

/* eslint-disable-next-line max-lines-per-function */
const router = () => {
  // @GET /api/v1/book
  bookRouter
    .route('/')
    .get(
      buildHandler(
        BookHandler,
        GetAllBooksFactory,
      ),
    );

  // @GET /api/v1/book/{id}
  bookRouter
    .route('/:id')
    .get(
      buildHandler(
        BookHandler,
        GetByIdBooksFactory,
      ),
    );

  // @POST /api/v1/book
  bookRouter
    .route('/')
    .post(
      buildHandler(
        BookHandler,
        BookFactory,
      ),
    );

  return bookRouter;
};


export default router;
