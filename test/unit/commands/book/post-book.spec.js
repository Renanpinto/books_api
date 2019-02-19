import BookCommand from '../../../../src/domain/commands/book/index';
import BookRepository from '../../../../src/infrastructure/repositories/book';
import EVENTS from '../../../../src/domain/global/events';
import setupListeners from '../../../helpers/setup-listeners';
import bookMock from '../../../fixture/entity/book.mock';
import Db from '../../../fixture/db/db.mock';
import MESSAGES from '../../../../src/domain/global/messages';

const { success, validationFailed } = EVENTS;

let event;
let result;

const command = new BookCommand({
  repository: new BookRepository(new Db()),
});

setupListeners(command, (response, emittedEvent) => {
  event = emittedEvent;
  result = response;
});


describe('execute()', () => {
  it('emits a successful event when repository is called', async (done) => {
    await command.execute(bookMock);

    expect(event).toBe(success);
    expect(result).toEqual(expect.stringContaining(`${MESSAGES.book.saved} - id:`));
    done();
  });

  it('emits a validationFailed event any required parameter is missing', async (done) => {
    const input = delete bookMock.title;
    await command.execute(input);

    expect(event).toBe(validationFailed);
    expect(result).toBeInstanceOf(Object);
    done();
  });
});
