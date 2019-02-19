import Joi from 'joi';
import uuid from 'uuid/v4';

const rules = Joi.object().keys({
  id: Joi.string(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  isbn: Joi.string().required(),
  language: Joi.string().required(),
});

export default class Book {
  constructor({
    title, description, isbn, language,
  }) {
    this.id = uuid();
    this.title = title;
    this.description = description;
    this.isbn = isbn;
    this.language = language;
  }

  isValid() {
    return Joi.validate(this, rules).error === null;
  }

  schemaErrors(message = 'invalidSchema') {
    return {
      errors: Joi.validate(this, rules, { abortEarly: false }).error,
      message,
    };
  }
}
