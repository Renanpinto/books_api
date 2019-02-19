import EventEmitter from 'events';
import EVENTS from '../../global/events';

const { success, internalError } = EVENTS;

class BookCommand extends EventEmitter {
  constructor({
    repository,
  }) {
    super();
    this.repository = repository;
  }

  async execute() {
    try {
      const { error, result } = await this.repository.findAll();
      if (error) throw new Error(error);
      this.emit(success, result);
    } catch (exception) {
      console.log('getBookCommand ', exception);
      this.emit(internalError, exception);
    }
  }
}

export default BookCommand;
