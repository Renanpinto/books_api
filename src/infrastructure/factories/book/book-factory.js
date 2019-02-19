import DB from '../../../db';
import BookRepository from '../../repositories/book';
import BookCommand from '../../../domain/commands/book';

class BookFactory {
  create() {
    const db = new DB();

    return new BookCommand({
      repository: new BookRepository(db),
    });
  }
}

export default BookFactory;
