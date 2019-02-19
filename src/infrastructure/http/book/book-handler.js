import EVENTS from '../../../domain/global/events';

const HTTP_METHODS_WITH_BODY = ['PATCH', 'POST', 'PUT'];

class BookHandler {
  constructor(request, response, command) {
    this.request = request;
    this.response = response;
    this.command = command;
  }

  setupListeners(command) {
    command.on(EVENTS.validationFailed, this.onValidationFailed.bind(this));
    command.on(EVENTS.success, this.onSuccess.bind(this));
    command.on(EVENTS.noContent, this.onNoContent.bind(this));
    command.on(EVENTS.internalError, this.onError.bind(this));
  }

  onValidationFailed({ errors }) {
    this.response.status(400).json({
      message: errors.details.reduce((finalString, { message }) => `${finalString} ${message},`, ''),
    });
  }

  onError(message) {
    this.response.status(500).json({ message });
  }

  onNoContent(message) {
    this.response.status(204).json({ message });
  }

  onSuccess(message) {
    this.response.status(200).json({ message });
  }

  buildInput() {
    const paramsSources = [this.request.params];

    if (HTTP_METHODS_WITH_BODY.includes(this.request.method)) {
      paramsSources.unshift(this.request.body);
    }

    return Object.assign({}, ...paramsSources);
  }

  async handle() {
    try {
      this.setupListeners(this.command);
      await this.command.execute(this.buildInput());
    } catch (error) {
      console.log('erro', error);
      this.response.status(500);
      this.response.json(error.toString());
    }
  }
}

export default BookHandler;
