const mongoose = require('mongoose');
const UserModel = require('../src/components/User/model');
const connections = require('../src/config/connection');

const userData = { 
    email: 'test@gmail.com', 
    fullName: 'TestUser',
 };

describe('scr -> components -> model', () => {
  beforeAll(async () => {
    await UserModel.deleteMany({}).catch((err) => {
      console.error(err);
    });
  });

  afterAll(async () => {
    await UserModel.deleteMany({}).catch((err) => {
      console.error(err);
    });
    await connections.close().catch((err) => {
      console.error(err);
    });
  });

  test('create & save user done', async () => {
    const validUser = await UserModel.create(userData);

    expect(validUser._id).toBeDefined();
    expect(validUser.fullName).toBe(userData.fullName);
    expect(validUser.email).toBe(userData.email);
  });

  test('Insert user, but the field does not defined in schema should be undefined', async () => {
    const userWithInvalidField = await UserModel.create({ 
        email: 'test@gmail.com', 
        fullName: 'GordN', 
        old: '10' });
    try {
        expect(userWithInvalidField._id).toBeDefined();
        expect(userWithInvalidField.old).toBeUndefined();
      } catch (error) {
        err = error;
      }
  });

  test('create user without required field should failed', async () => {
    let err;
    try {
      await UserModel.create({ fullName: 'GordN' });
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.fullName).toBeDefined();
  });
});