import BookEntity from '../../../../src/domain/entities/book';
import bookMock from '../../../fixture/entity/book.mock';

describe('Book Entity', () => {
  describe('isValid()', () => {
    test('Should return true and no errors if the object Book is created and not empty', () => {
      const entity = new BookEntity(bookMock);

      expect(entity.isValid()).toBe(true);
    });
  });
  describe('schemaErrors()', () => {
    test('Should return error and invalidSchema message if any required Book object param is empty', () => {
      const entity = new BookEntity(bookMock);

      delete entity.title;
      const errs = entity.schemaErrors();

      expect(errs.errors.isJoi).toEqual(true);
      expect(errs.message).toEqual('invalidSchema');
    });
  });
});
