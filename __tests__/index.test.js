import fs from 'fs';
import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pathToExpectedFileStylish = '/../__fixtures__/exp_stylish.txt';
const pathToExpectedFilePlain = '/../__fixtures__/exp_plain.txt';
const pathToFileJson1 = '../__fixtures__/f1.json';
const pathToFileJson2 = '../__fixtures__/f2.json';
const pathToFileYml1 = '../__fixtures__/f1.yml';
const pathToFileYml2 = '../__fixtures__/f2.yml';

test('gendiff_stylish.json', () => {
  const dataExpectedFile = fs.readFileSync(`${__dirname}${pathToExpectedFileStylish}`, 'utf-8');
  const diff = genDiff(pathToFileJson1, pathToFileJson2, 'stylish');
  expect(diff).toEqual(dataExpectedFile);
});

test('gendiff_stylish.yml', () => {
  const dataExpectedFile = fs.readFileSync(`${__dirname}${pathToExpectedFileStylish}`, 'utf-8');
  const diff = genDiff(pathToFileYml1, pathToFileYml2, 'stylish');
  expect(diff).toEqual(dataExpectedFile);
});

test('gendiff_plain', () => {
  const dataExpectedFile = fs.readFileSync(`${__dirname}${pathToExpectedFilePlain}`, 'utf-8');
  const diff = genDiff(pathToFileJson1, pathToFileJson2, 'plain');
  expect(diff).toEqual(dataExpectedFile);
});
