import EVENTS from '../../src/domain/global/events';

export default (command, callback) => {
  Object.keys(EVENTS).forEach((event) => {
    command.on(event, eventData => callback(eventData, event));
  });
};
