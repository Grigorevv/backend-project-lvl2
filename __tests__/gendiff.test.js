/* eslint-disable no-underscore-dangle */
import fs from 'fs';
import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('gendiff_plain.json', () => {
  const dataExpectedFile = fs.readFileSync(`${__dirname}/../__fixtures__/exp_plain.txt`, 'utf-8');
  const diff = genDiff('./__fixtures__/plainf1.json', './__fixtures__/plainf2.json', 'stylish');
  expect(diff).toEqual(dataExpectedFile);
});

test('gendiff_plain.yml', () => {
  const dataExpectedFile = fs.readFileSync(`${__dirname}/../__fixtures__/exp_plain.txt`, 'utf-8');
  const diff = genDiff('./__fixtures__/plainf1.yml', './__fixtures__/plainf2.yml', 'stylish');
  expect(diff).toEqual(dataExpectedFile);
});

test('gendiff_nested.json', () => {
  const dataExpectedFile = fs.readFileSync(`${__dirname}/../__fixtures__/exp_nested.txt`, 'utf-8');
  const diff = genDiff('./__fixtures__/nestedf1.json', './__fixtures__/nestedf2.json', 'stylish');
  expect(diff).toEqual(dataExpectedFile);
});

test('gendiff_nested.yml', () => {
  const dataExpectedFile = fs.readFileSync(`${__dirname}/../__fixtures__/exp_nested.txt`, 'utf-8');
  const diff = genDiff('./__fixtures__/nestedf1.yml', './__fixtures__/nestedf2.yml', 'stylish');
  expect(diff).toEqual(dataExpectedFile);
});

test('gendiff_nested_formatter_plane', () => {
  const dataExpectedFile = fs.readFileSync(`${__dirname}/../__fixtures__/exp.txt`, 'utf-8');
  const diff = genDiff('./__fixtures__/nestedf1.json', './__fixtures__/nestedf2.json', 'plane');
  expect(diff).toEqual(dataExpectedFile);
});
