import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import parser from './parsers.js';
import buildAst from './buildAst.js';
import format from './format.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getPathToFile = (filename) => path.resolve(__dirname, filename);

const getFileData = (filepath) => fs.readFileSync(getPathToFile(filepath), 'utf-8');

const getFileFormat = (filepath) => {
  const extname = path.extname(filepath);
  return extname.slice(1, extname.length);
};

export default (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parser(getFileData(filepath1), getFileFormat(filepath1));
  const data2 = parser(getFileData(filepath2), getFileFormat(filepath2));
  const ast = buildAst(data1, data2);
  return format(ast, formatName);
};
