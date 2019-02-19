import DB from '../../../db';
import BookRepository from '../../repositories/book';
import BookCommand from '../../../domain/commands/book';

class BookFactory {
  create() {
    return new BookCommand({
      repository: new BookRepository(new DB()),
    });
  }
}

export default BookFactory;
