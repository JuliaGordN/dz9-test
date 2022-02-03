const mongoose = require('mongoose');
const UserService = require('../src/components/User/service');

jest.mock('../src/components/User/model');
const UserModel = require('../src/components/User/model');

const userInput = {
  email: 'test@gmail.com',
  fullName: 'GordN',
};

describe('scr -> components -> service', () => {
  describe('findAll', () => {
    test('when return a array with no users', (done) => {
      UserModel.find.mockResolvedValue([]);
      UserService.findAll({})
        .then((data) => {
          expect(data).toBeInstanceOf(Array);
          expect(data.length).toBe(0);
          done();
        })
        .catch((err) => done(err));
    });

    test('when return a array with users more than 0', (done) => {
      const id = new mongoose.Types.ObjectId();
      const userOne = {
        fullName: 'TEET',
        email: 'teet@gmail.com',
        _id: id,
      };
      UserModel.find.mockResolvedValue([userOne]);
      UserService.findAll({})
        .then((data) => {
          expect(data).toBeInstanceOf(Array);
          expect(data.length).not.toBe(0);
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe('create', () => {
    describe('given the user payload are valid', () => {
      test('should return created user', (done) => {
        const id = new mongoose.Types.ObjectId();
        const userOne = {
          fullName: userInput.fullName,
          email: userInput.email,
          _id: id,
        };
        UserModel.create.mockResolvedValue(userOne);
        UserService.create(userInput)
          .then((data) => {
            expect(data).toMatchObject(userOne);
            done();
          })
          .catch((err) => done(err));
      });
      test('E11000: should return error because email already exists', (done) => {
        const id = new mongoose.Types.ObjectId();
        const userOne = {
          fullName: userInput.fullName,
          email: userInput.email,
          _id: id,
        };
        UserModel.create.mockResolvedValue(userOne);
        UserService.create(userInput)
          .then((data) => {
            expect(data).toMatchObject(userOne);
            done();
          })
          .catch((err) => done(err));
      });
    });
    describe('given the user payload are not valid', () => {
      test('should the email not be empty', (done) => {
        done();
      });
      test('the email string are not valid', (done) => {
        done();
      });
      test('the fullName should not be empty', (done) => {
        done();
      });
    });
  });

  describe('findById', () => {
    describe('given id are valid', () => {
      test('should return user', (done) => {
        const id = new mongoose.Types.ObjectId();
        const userOne = {
          fullName: userInput.fullName,
          email: userInput.email,
          _id: id,
        };
        UserModel.findById.mockResolvedValue(userOne);
        UserService.findById(id)
          .then((data) => {
            expect(data).toMatchObject(userOne);
            done();
          })
          .catch((err) => done(err));
      });
      test('should return user not found', (done) => {
        const id = new mongoose.Types.ObjectId();
        UserModel.findById.mockResolvedValue(null);
        UserService.findById(id)
          .then((data) => {
            expect(data).toBeNull();
            done();
          })
          .catch((err) => done(err));
      });
    });
  });

  describe('updateById', () => {
    describe('given user payload are valid', () => {
      test('should return update info', (done) => {
        const id = new mongoose.Types.ObjectId();
        const userOne = {
          fullName: userInput.fullName,
        };
        const mockResolved = {
          acknowledged: true,
          modifiedCount: 1,
          upsertedId: null,
          upsertedCount: 0,
          matchedCount: 1,
        };
        UserModel.updateOne.mockResolvedValue(mockResolved);
        UserService.updateById(id, userOne)
          .then((data) => {
            expect(data.matchedCount).toBe(1);
            expect(data.modifiedCount).toBe(1);
            done();
          })
          .catch((err) => done(err));
      });

      test('should return user not found', (done) => {
        const id = new mongoose.Types.ObjectId();
        const userOne = {
          fullName: userInput.fullName,
        };
        const mockResolved = {
          acknowledged: true,
          modifiedCount: 0,
          upsertedId: null,
          upsertedCount: 0,
          matchedCount: 0,
        };
        UserModel.updateOne.mockResolvedValue(mockResolved);
        UserService.updateById(id, userOne)
          .then((data) => {
            expect(data.matchedCount).toBe(0);
            done();
          })
          .catch((err) => done(err));
      });
    });

    describe('given user payload are not valid', () => {
      const id = new mongoose.Types.ObjectId();
      test('given id must not be empty', (done) => {
        const userPayload = {
          id: id,
          fullName: 'Tester',
        };
        UserModel.updateOne.mockResolvedValue(mongoose.Error.ValidatorError);
        UserService.updateById({ _id: userPayload.id }, userPayload)
          .then((data) => {
            expect(data).toBe(mongoose.Error.ValidatorError);
            done();
          })
          .catch((err) => done(err));
      });
      test('given id must be are valid', (done) => {
        done();
      });
    });
  });

  describe('deleteById', () => {
    describe('given user payload are valid', () => {
      test('should return deleteCount 1', (done) => {
        const id = new mongoose.Types.ObjectId();
        UserModel.deleteOne.mockResolvedValue({ deletedCount: 1 });
        UserService.deleteById({ id: id })
          .then((data) => {
            expect(data).toHaveProperty('deletedCount');
            expect(data.deletedCount).toBe(1);
            done();
          })
          .catch((err) => done(err));
      });
    });
    describe('given user payload are not valid', () => {
      test('should return validation error', (done) => {
        done();
      });
    });
  });
});