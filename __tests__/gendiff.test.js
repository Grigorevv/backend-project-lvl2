/* eslint-disable no-underscore-dangle */
import fs from 'fs';
import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../gendiff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('gendiff', () => {
  const dataExpectedFile = fs.readFileSync(`${__dirname}/../__fixtures__/e1.txt`, 'utf-8');
  const diff = genDiff('./__fixtures__/f1.json', './__fixtures__/f2.json');
  expect(diff).toEqual(dataExpectedFile);
});
