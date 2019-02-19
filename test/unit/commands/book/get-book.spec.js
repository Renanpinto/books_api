import BookCommand from '../../../../src/domain/commands/book/get-all-command';
import BookByIdCommand from '../../../../src/domain/commands/book/get-by-id-command';
import BookRepository from '../../../../src/infrastructure/repositories/book';
import Db from '../../../../src/db';
import EVENTS from '../../../../src/domain/global/events';
import setupListeners from '../../../helpers/setup-listeners';
import TestDatabase from '../../../helpers/database';
import bookMock from '../../../fixture/entity/book.mock';
import BookEntity from '../../../../src/domain/entities/book';

const { success } = EVENTS;

let db;
let event;
let testDb;
let result;

jest.setTimeout(30000);

describe('Book command', () => {
  it('emits a successful event when data is recovered from database', async (done) => {
    testDb = new TestDatabase();
    await testDb.setup();
    db = new Db(testDb.typeOrmConfig());

    const bookRepository = new BookRepository(db);
    const command = new BookCommand({
      repository: bookRepository,
    });

    setupListeners(command, (response, emittedEvent) => {
      event = emittedEvent;
      result = response;
    });
    const toSaveBook = new BookEntity(bookMock);
    await bookRepository.saveBook(toSaveBook);
    await command.execute();

    expect(event).toBe(success);
    expect(result).toEqual([Object.assign(bookMock, { id: toSaveBook.id })]);
    await testDb.teardown();
    done();
  });
});

describe('Book by id command', () => {
  it('emits a successful event when data is recovered from database', async (done) => {
    testDb = new TestDatabase();
    await testDb.setup();
    db = new Db(testDb.typeOrmConfig());

    const bookRepository = new BookRepository(db);
    const command = new BookByIdCommand({
      repository: bookRepository,
    });

    setupListeners(command, (response, emittedEvent) => {
      event = emittedEvent;
      result = response;
    });
    const toSaveBook = new BookEntity(bookMock);
    await bookRepository.saveBook(toSaveBook);
    await command.execute(toSaveBook.id);

    expect(event).toBe(success);
    expect(result).toEqual(Object.assign(bookMock, { id: toSaveBook.id }));
    await testDb.teardown();
    done();
  });
});
