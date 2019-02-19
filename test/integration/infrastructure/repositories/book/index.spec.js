// import faker from 'faker';
// import uuid from 'uuid/v4';
// import TestDatabase from '../../../../helpers/database';
// import ProductsMaterialRepository from '../../../../../src/infrastructure/repositories/products-material';
// import Db from '../../../../../src/db';
// import Material from '../../../../../src/infrastructure/repositories/typeorm/schema/material';
// import Product from '../../../../../src/infrastructure/repositories/typeorm/schema/product';
// import ProductsMaterial from '../../../../../src/infrastructure/repositories/typeorm/schema/products-material';
// import AvailableInventoryType from '../../../../../src/infrastructure/repositories/typeorm/schema/available-inventory-type';
// import Bucket from '../../../../../src/infrastructure/repositories/typeorm/schema/bucket';

// const entities = {
//   AvailableInventoryType, Bucket, Material, Product, ProductsMaterial,
// };

// describe('ProductsMaterialRepository', () => {
//   let testDb;
//   let repository;
//   let db;

//   jest.setTimeout(30000);

//   beforeAll(async () => {
//     testDb = new TestDatabase();
//     await testDb.setup();
//     db = new Db(testDb.typeOrmConfig());

//     repository = new ProductsMaterialRepository({ db, entities });
//   });

//   afterAll(async () => {
//     await testDb.teardown();
//   });

//   describe('buildWhereInput()', () => {
//     it('returns formated object to where', async (done) => {
//       const result = await repository.buildWhereInput({ companyId: 1, distributionCenterId: 2 });
//       const expectedResult = {
//         companyId: 1,
//         countryCode: null,
//         distributionCenterId: 2,
//         material: null,
//         product: null,
//       };

//       expect(result).toEqual(expectedResult);
//       done();
//     });
//   });


//   describe('findById()', () => {
//     it('returns productsMaterial found from database', async (done) => {
//       const productsMaterialUid = uuid();
//       const toSave = {
//         companyId: faker.random.number({ max: 100, min: 1 }),
//         countryCode: 'PE',
//         distributionCenterId: faker.random.number({ max: 100, min: 1 }),
//         productsMaterialUid,
//       };

//       await repository.save(toSave);

//       const { result } = await repository.findById({ productsMaterialUid });

//       expect(result).toEqual(
//         expect.objectContaining({
//           ...toSave,
//         }),
//       );
//       done();
//     });
//   });

//   describe('findSimilar()', () => {
//     it('returns productsMaterial when companyId, distributionCenterId and countryCode are similar in database', async (done) => {
//       const productsMaterialUid = uuid();
//       const toSave = {
//         companyId: faker.random.number({ max: 100, min: 1 }),
//         countryCode: 'PE',
//         distributionCenterId: faker.random.number({ max: 100, min: 1 }),
//         productsMaterialUid,
//       };

//       await repository.save(toSave);

//       const { error, result } = await repository.findSimilar({
//         companyId: toSave.companyId,
//         countryCode: toSave.countryCode,
//         distributionCenterId: toSave.distributionCenterId,
//       });

//       expect(error).toBeNull();
//       expect(result).toEqual(
//         expect.objectContaining({
//           ...toSave,
//         }),
//       );
//       done();
//     });
//   });

//   describe('findRelationByMaterial()', () => {
//     it('returns empty array when product from relation is null', async (done) => {
//       const productsMaterialUid = uuid();
//       const toSave = {
//         companyId: faker.random.number({ max: 100, min: 1 }),
//         countryCode: 'PE',
//         distributionCenterId: faker.random.number({ max: 100, min: 1 }),
//         productsMaterialUid,
//       };

//       await repository.save(toSave);

//       const queryRunner = await repository.db.createQueryRunner();

//       const result = await repository.findRelationByMaterial(queryRunner, {
//         countryCode: toSave.countryCode,
//         distributionCenterId: toSave.distributionCenterId,
//       });

//       expect(result).toHaveLength(0);

//       done();
//     });
//   });

//   describe('findRelationsByProduct()', () => {
//     it('returns result as empty array when product from relation is null', async (done) => {
//       const productsMaterialUid = uuid();
//       const toSave = {
//         companyId: faker.random.number({ max: 100, min: 1 }),
//         countryCode: 'PE',
//         distributionCenterId: faker.random.number({ max: 100, min: 1 }),
//         productsMaterialUid,
//       };

//       await repository.save(toSave);

//       const queryRunner = await repository.db.createQueryRunner();

//       const result = await repository.findRelationsByProduct(queryRunner, {
//         countryCode: toSave.countryCode,
//         distributionCenterId: toSave.distributionCenterId,
//       });

//       expect(result).toBeInstanceOf(Array);
//       expect(result.length).toEqual(0);
//       done();
//     });
//   });

//   describe('findOnlyProductByRelation()', () => {
//     it('returns empty array when product from relation is null', async (done) => {
//       const productsMaterialUid = uuid();
//       const toSave = {
//         companyId: faker.random.number({ max: 100, min: 1 }),
//         countryCode: 'PE',
//         distributionCenterId: faker.random.number({ max: 100, min: 1 }),
//         productsMaterialUid,
//       };

//       await repository.save(toSave);

//       const queryRunner = await repository.db.createQueryRunner();

//       const result = await repository.findOnlyProductByRelation(queryRunner, {
//         countryCode: toSave.countryCode,
//         distributionCenterId: toSave.distributionCenterId,
//       });

//       expect(result).toHaveLength(0);
//       done();
//     });
//   });
// });
