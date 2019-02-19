# Books API

## How to use

To use this appplication we`ll need

[Postgres database]. (https://www.postgresql.org/download/);

[npm]. (https://www.npmjs.com/get-npm);

### Setup

Create a database and set the database parameters in .env file and src/db/knexfile.js

To install dependencies Run `npm install`.

Create schema and tables by running `npm run db:migrate`.

Start the application running `npm start`

To run tests Run `npm test`.

### Endpoints

This will save a book into the database

POST /api/v1/book
    ``{
	    "title": "title",
	    "description": "description",
	    "language": "pt",
	    "isbn": "isbn"
    }``

This will get all books from the database

GET /api/v1/book

This will get a specific book from the database

GET /api/v1/book/{:id}

This will all books from the website (https://kotlinlang.org/docs/books.html)

GET /api/v1/books

### Lint

To verify if any lint rule was broken run: `npm run lint`.


