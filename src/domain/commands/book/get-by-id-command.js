import EventEmitter from 'events';
import Joi from 'joi';
import EVENTS from '../../global/events';

const { success, internalError, noContent } = EVENTS;

class BookCommand extends EventEmitter {
  constructor({
    repository,
  }) {
    super();
    this.repository = repository;
  }

  async execute(param) {
    try {
      const uid = this.validateUid(param);
      if (uid.error) {
        this.emit(internalError, 'Param must be a uid');
        return;
      }
      const { error, result } = await this.repository.findById(param);
      if (!result) {
        this.emit(noContent);
        return;
      }
      if (error) throw new Error(error);
      this.emit(success, result);
    } catch (exception) {
      console.log('getBookCommand ', exception);
      this.emit(internalError, exception);
    }
  }

  validateUid({ id }) {
    return Joi.validate(id, Joi.string().guid());
  }
}

export default BookCommand;
