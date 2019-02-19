import express from 'express';
import buildHandler from '../handler';
import GetBooksFactory from '../../factories/book/api-books-factory';
import BookHandler from '../../http/book/book-handler';

const bookRouter = express.Router();

const router = () => {
  // @GET /api/v1/books
  bookRouter
    .route('/')
    .get(
      buildHandler(
        BookHandler,
        GetBooksFactory,
      ),
    );

  return bookRouter;
};


export default router;
