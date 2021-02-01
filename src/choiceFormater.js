import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';
import json from './formatters/json.js';

const getDiff = (ast, formatName) => {
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

export default getDiff;
