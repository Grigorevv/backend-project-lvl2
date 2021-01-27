/* eslint-disable no-underscore-dangle */
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import parser from './parsers.js';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';
import json from './formatters/json.js';
import buildAst from './buildast.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getPathToFile = (filename) => path.resolve(__dirname, filename);

const getFileData = (filepath) => fs.readFileSync(getPathToFile(filepath), 'utf-8');

const getFileExtension = (filepath) => path.extname(filepath);

const genDiff = (filepath1, filepath2, formatName) => {
  const obj1 = parser(getFileData(filepath1), getFileExtension(filepath1));
  const obj2 = parser(getFileData(filepath2), getFileExtension(filepath2));
  const ast = buildAst(obj1, obj2);
  let diff;
  switch (formatName) {
    case 'stylish':
      diff = stylish(ast);
      break;
    case 'plain':
      diff = plain(ast);
      break;
    case 'json':
      diff = json(ast);
      break;
    default:
      break;
  }
  return diff;
};

export default genDiff;
