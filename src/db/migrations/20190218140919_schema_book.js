
exports.up = knex => knex.schema.createSchema('programming_books');
exports.down = knex => knex.schema.dropSchema('programming_books');
