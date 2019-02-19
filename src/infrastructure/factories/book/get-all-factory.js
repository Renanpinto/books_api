import DB from '../../../db';
import BookRepository from '../../repositories/book';
import GetBookCommand from '../../../domain/commands/book/get-all-command';

class BookFactory {
  create() {
    const db = new DB();

    return new GetBookCommand({
      repository: new BookRepository(db),
    });
  }
}

export default BookFactory;
