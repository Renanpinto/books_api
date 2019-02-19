import BookSchema from '../typeorm/schema/book';

class BookRepository {
  constructor(db) {
    this.db = db;
    this.entity = BookSchema;
  }

  saveBook(args) {
    return this.transaction(
      args,
      (queryRunner, entityObject) => queryRunner.manager.save(this.entity, entityObject),
    );
  }

  async findAll() {
    const repository = await this.db.getRepository(this.entity);

    let result = [];
    let error = null;

    try {
      result = await repository.find();
    } catch (exception) {
      error = exception;
    }

    return { error, result };
  }

  async findById(params) {
    const repository = await this.db.getRepository(this.entity);

    let result = null;
    let error = null;

    try {
      result = await repository.findOne(params);
    } catch (exception) {
      error = exception;
    }

    return { error, result };
  }

  transaction(args, callback) {
    return this.db.transaction(queryRunner => callback(queryRunner, args));
  }
}

export default BookRepository;
