/* eslint-disable no-underscore-dangle */
import fs from 'fs';
import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('gendiff_stylish.json', () => {
  const dataExpectedFile = fs.readFileSync(`${__dirname}/../__fixtures__/exp_stylish.txt`, 'utf-8');
  const diff = genDiff('./__fixtures__/f1.json', './__fixtures__/f2.json', 'stylish');
  expect(diff).toEqual(dataExpectedFile);
});

test('gendiff_stylish.yml', () => {
  const dataExpectedFile = fs.readFileSync(`${__dirname}/../__fixtures__/exp_stylish.txt`, 'utf-8');
  const diff = genDiff('./__fixtures__/f1.yml', './__fixtures__/f2.yml', 'stylish');
  expect(diff).toEqual(dataExpectedFile);
});

test('gendiff_plain', () => {
  const dataExpectedFile = fs.readFileSync(`${__dirname}/../__fixtures__/exp_plain.txt`, 'utf-8');
  const diff = genDiff('./__fixtures__/f1.json', './__fixtures__/f2.json', 'plain');
  expect(diff).toEqual(dataExpectedFile);
});

test('gendiff_json', () => {
  const dataExpectedFile = fs.readFileSync(`${__dirname}/../__fixtures__/exp_json.txt`, 'utf-8');
  const diff = genDiff('./__fixtures__/f1.json', './__fixtures__/f2.yml', 'json');
  expect(diff).toEqual(dataExpectedFile);
});
