import EventEmitter from 'events';
import EVENTS from '../../global/events';

const { success, internalError } = EVENTS;

class BookCommand extends EventEmitter {
  constructor({
    service,
  }) {
    super();
    this.service = service;
  }

  async execute() {
    let books;
    try {
      books = await this.service.getBooks();
    } catch (exception) {
      console.log('bookCommand ', exception);
      this.emit(internalError, exception);
    }
    this.emit(success, books);
  }
}

export default BookCommand;
