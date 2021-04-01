import renderStylish from './formatters/stylish.js';
import renderPlain from './formatters/plain.js';
import renderJson from './formatters/json.js';

export default (ast, formatName) => {
  switch (formatName) {
    case 'stylish':
      return renderStylish(ast);

    case 'plain':
      return renderPlain(ast);

    case 'json':
      return renderJson(ast);

    default:
      throw new Error(`Unknown state: '${formatName}'!`);
  }
};
