const path = require('path');
const fs = require('fs');

const MAIN_FILES = [
  '.editorconfig',
  '.eslintrc.js',
  'nodemon.json',
  'package.json',
  'package-lock.json',
  'README.md',
];

const EXIST = (PATH) => {
  try {
    fs.accessSync(PATH);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

describe('Checking exists file', () => {
  const rootDir = path.resolve(path.join(__dirname, '../'));

  MAIN_FILES.forEach((item) => {
    test(`${item}`, (done) => {
      expect.assertions(1);
      const result = EXIST(`${rootDir}/${item}`);
      expect(result).toBe(true);
      done();
    });
  });
});