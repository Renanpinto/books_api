import BookService from '../../services/book';
import GetBookCommand from '../../../domain/commands/book/api-books-command';
import request from '../../../helpers/request';

class BookFactory {
  create() {
    return new GetBookCommand({
      service: new BookService(request),
    });
  }
}

export default BookFactory;
