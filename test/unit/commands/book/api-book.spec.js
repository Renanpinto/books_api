import BookCommand from '../../../../src/domain/commands/book/api-books-command';
import BookService from '../../../../src/infrastructure/services/book';
import EVENTS from '../../../../src/domain/global/events';
import setupListeners from '../../../helpers/setup-listeners';
import request from '../../../fixture/request/request.mock';
import bookMock from '../../../fixture/entity/book.mock';

const { success } = EVENTS;

let event;
let result;

const command = new BookCommand({
  service: new BookService(request),
});

setupListeners(command, (response, emittedEvent) => {
  event = emittedEvent;
  result = response;
});


describe('execute()', () => {
  it('emits a success event when request is successfull', async (done) => {
    await command.execute();
    /* eslint-disable-next-line */
    const response = {
      numberBooks: [bookMock].length,
      books: [bookMock],
    };
    expect(event).toBe(success);
    expect(result).toBeInstanceOf(Object);
    done();
  });
});
