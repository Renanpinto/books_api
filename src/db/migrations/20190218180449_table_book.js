exports.up = knex => Promise.all([
  knex.schema.withSchema('programming_books').hasTable('book').then((exists) => {
    if (!exists) {
      return knex.schema.withSchema('programming_books').createTable('book', (table) => {
        table
          .uuid('id')
          .notNullable()
          .comment('Unique identifier for book');

        table
          .string('title')
          .comment('Book title');

        table
          .string('description')
          .comment('Book description');

        table
          .string('language')
          .comment('Book language');

        table
          .string('isbn')
          .comment('Book ISBN');

        table.primary(['id']);
      });
    }

    return null;
  }),
]);

exports.down = knex => knex.schema.withSchema('programming_books').dropTableIfExists('book');
