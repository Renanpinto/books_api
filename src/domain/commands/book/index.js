import EventEmitter from 'events';
import EVENTS from '../../global/events';
import BookEntity from '../../entities/book';
import MESSAGES from '../../global/messages';

const { success, internalError, validationFailed } = EVENTS;

class BookCommand extends EventEmitter {
  constructor({
    repository,
  }) {
    super();
    this.repository = repository;
  }

  async execute(params) {
    console.log('book', params);
    try {
      const book = new BookEntity(params);

      if (!book.isValid()) {
        this.emit(validationFailed, book.schemaErrors(MESSAGES.book.validationError));
        return;
      }
      this.repository.saveBook(book);
      this.emit(success, `${MESSAGES.book.saved} - id: ${book.id}`);
    } catch (exception) {
      console.log('bookCommand ', exception);
      this.emit(internalError, exception);
    }
  }
}

export default BookCommand;
