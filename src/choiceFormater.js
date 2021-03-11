import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';
import json from './formatters/json.js';

export default (ast, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(ast);

    case 'plain':
      return plain(ast);

    case 'json':
      return json(ast);

    default:
      break;
  }
  return true;
};
