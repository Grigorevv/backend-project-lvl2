import fs from 'fs';
import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pathToExpectedFileStylish = 'exp_stylish.txt';
const pathToExpectedFilePlain = 'exp_plain.txt';
const pathToExpectedFileJson = 'exp_json.txt';
const pathToFileJson1 = 'f1.json';
const pathToFileJson2 = 'f2.json';
const pathToFileYml1 = 'f1.yml';
const pathToFileYml2 = 'f2.yml';
const fixtures = '../__fixtures__/';

const buildPaths = (fileName) => path.join(__dirname, fixtures, fileName);

test('gendiff_stylish.json', () => {
  const dataExpectedFile = fs.readFileSync(buildPaths(pathToExpectedFileStylish), 'utf-8');
  const diff = genDiff(buildPaths(pathToFileJson1), buildPaths(pathToFileJson2), 'stylish');
  expect(diff).toEqual(dataExpectedFile);
});

test('gendiff_stylish.yml', () => {
  const dataExpectedFile = fs.readFileSync(buildPaths(pathToExpectedFileStylish), 'utf-8');
  const diff = genDiff(buildPaths(pathToFileYml1), buildPaths(pathToFileYml2), 'stylish');
  expect(diff).toEqual(dataExpectedFile);
});

test('gendiff_plain', () => {
  const dataExpectedFile = fs.readFileSync(buildPaths(pathToExpectedFilePlain), 'utf-8');
  const diff = genDiff(buildPaths(pathToFileJson1), buildPaths(pathToFileJson2), 'plain');
  expect(diff).toEqual(dataExpectedFile);
});

test('gendiff_JSON', () => {
  const dataExpectedFile = fs.readFileSync(buildPaths(pathToExpectedFileJson), 'utf-8');
  const diff = genDiff(buildPaths(pathToFileJson1), buildPaths(pathToFileJson2), 'json');
  expect(diff).toEqual(dataExpectedFile);
});

test('gendiff formatter default', () => {
  const dataExpectedFile = fs.readFileSync(buildPaths(pathToExpectedFileStylish), 'utf-8');
  const diff = genDiff(buildPaths(pathToFileJson1), buildPaths(pathToFileJson2));
  expect(diff).toEqual(dataExpectedFile);
});
