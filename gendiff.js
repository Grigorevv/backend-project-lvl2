// gendiff ./__fixtures__/f1.json ./__fixtures__/f2.json
/* eslint-disable no-underscore-dangle */
import _ from 'lodash';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getPathToFile = (filename) => path.resolve(__dirname, filename);

const getFileData = (filepath) => fs.readFileSync(getPathToFile(filepath), 'utf-8');

const genDiff = (filepath1, filepath2) => {
  const dataFromfile1 = JSON.parse(getFileData(filepath1));
  const dataFromfile2 = JSON.parse(getFileData(filepath2));
  const diff = {};
  const keys = _.union(_.keys(dataFromfile1), _.keys(dataFromfile2));
  keys.map((key) => {
    if (!_.has(dataFromfile1, key)) {
      diff[`${key} +`] = dataFromfile2[key];
    } else if (!_.has(dataFromfile2, key)) {
      diff[`${key} -`] = dataFromfile1[key];
    } else if (dataFromfile1[key] !== dataFromfile2[key]) {
      diff[`${key} +`] = dataFromfile1[key];
      diff[`${key} -`] = dataFromfile2[key];
    } else {
      diff[`${key}  `] = dataFromfile1[key];
    }
    return diff;
  });
  let str = '';
  Object.keys(diff).sort().forEach((key) => {
    str += `  ${key.split(' ').reverse().join(' ')}: ${diff[key]}\n`;
  });
  return `{\n${str}}`;
};

export default genDiff;
