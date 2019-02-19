import { EntitySchema } from 'typeorm';

export default new EntitySchema({
  columns: {
    title: {
      type: 'varchar',
    },
    id: {
      primary: true,
      type: 'uuid',
    },
    description: {
      type: 'varchar',
    },
    language: {
      type: 'varchar',
    },
    isbn: {
      type: 'varchar',
    },
  },
  name: 'Book',
  schema: 'programming_books',
  tableName: 'book',
});
