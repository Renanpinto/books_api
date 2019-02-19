// /* eslint-disable max-lines-per-function */
// import uuid from 'uuid/v4';
// import faker from 'faker';
// import LogisticCoverageHistory from '../../../../src/domain/entities/logistic-coverage-history';
// import LogisticCoverageHistoryCommand from '../../../../src/domain/commands/logistic-coverage-history';
// import LogisticCoverageRepository from '../../../../src/infrastructure/repositories/logistic-coverage-history';
// import Db from '../../../../src/db';
// import STATUS from '../../../../src/domain/global/status';
// import MESSAGES from '../../../../src/domain/global/messages';
// import CONFIGS from '../../../../src/domain/global/configs';
// import EVENTS from '../../../../src/domain/global/events';
// import setupListeners from '../../../helpers/setup-listeners';
// import TestDatabase from '../../../helpers/database';

// const { success } = EVENTS;

// describe('BookCommand', () => {
//   let db;
//   let command;
//   let event;
//   let testDb;
//   let service;

//   jest.setTimeout(30000);

//   beforeAll(async () => {
//     testDb = new TestDatabase();
//     await testDb.setup();
//     db = new Db(testDb.typeOrmConfig());
//   });

//   command = new LogisticCoverageHistoryCommand({
//     repository: new LogisticCoverageRepository(db),
//     services: {
//     },
//   });

//   setupListeners(command, (response, emittedEvent) => {
//     event = emittedEvent;
//   });
// });

// afterAll(async () => {
//   await testDb.teardown();
// });

// describe('execute()', () => {
//   it('emits a successful event when no data is found', async (done) => {
//     await command.execute();

//     expect(event).toBe(success);
//     done();
//   });

//   it.skip('emits a successful event when data in LogisticCoverage is outdated and valid true', async (done) => {
//     const logisticRepository = new LogisticCoverageRepository(db);

//     const logisticCoverageHistoryUid = uuid();
//     const toSaveLogistic = new LogisticCoverageHistory({
//       companyId: faker.random.number({ max: 100, min: 1 }),
//       countryCode: 'PE',
//       distributionCenterId: faker.random.number({ max: 100, min: 1 }),
//       endDate: faker.date.past(1),
//       isBundle: false,
//       logisticCoverageHistoryUid,
//       materialCode: faker.random.number({ max: 100, min: 1 }),
//       priority: faker.random.number({ max: 5, min: 1 }),
//       productCode: faker.random.number({ max: 100, min: 1 }),
//       startDate: faker.date.past(2),
//       valid: true,
//     });

//     await logisticRepository.save(toSaveLogistic);
//     await service.bulkSaveProductsMaterialAndRelated([toSaveLogistic]);

//     await command.execute();

//     expect(event).toBe(success);
//     done();
//   });

//   it('emits a successful event when logistic coverage dates are in the future', async (done) => {
//     const logisticRepository = new LogisticCoverageRepository(db);

//     const logisticCoverageHistoryUid = uuid();
//     const toSaveLogistic = new LogisticCoverageHistory({
//       companyId: faker.random.number({ max: 100, min: 1 }),
//       countryCode: 'PE',
//       distributionCenterId: faker.random.number({ max: 100, min: 1 }),
//       endDate: faker.date.future(2),
//       isBundle: false,
//       logisticCoverageHistoryUid,
//       materialCode: faker.random.number({ max: 100, min: 1 }),
//       priority: faker.random.number({ max: 5, min: 1 }),
//       productCode: faker.random.number({ max: 100, min: 1 }),
//       startDate: faker.date.future(1),
//       valid: true,
//     });

//     await logisticRepository.save(toSaveLogistic);

//     await command.execute();

//     expect(event).toBe(success);
//     done();
//   });

//   it('emits success event when the current date is between the logistic coverage dates ', async (done) => {
//     const logisticRepository = new LogisticCoverageRepository(db);

//     const logisticCoverageHistoryUid = uuid();
//     const toSaveLogistic = new LogisticCoverageHistory({
//       companyId: faker.random.number({ max: 100, min: 1 }),
//       countryCode: 'PE',
//       distributionCenterId: faker.random.number({ max: 100, min: 1 }),
//       endDate: faker.date.future(1),
//       isBundle: false,
//       logisticCoverageHistoryUid,
//       materialCode: faker.random.number({ max: 100, min: 1 }),
//       priority: faker.random.number({ max: 5, min: 1 }),
//       productCode: faker.random.number({ max: 100, min: 1 }),
//       startDate: faker.date.past(1),
//       valid: true,
//     });

//     await logisticRepository.save(toSaveLogistic);

//     await command.execute();

//     expect(event).toBe(success);
//     done();
//   });
// });
