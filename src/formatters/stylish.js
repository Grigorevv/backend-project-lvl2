const replacer = ' ';
const spacesCount = 4;

const getIndent = (depth) => {
  const indentSize = depth * spacesCount;
  const currentIndent = replacer.repeat(indentSize - 2);
  const bracketIndent = replacer.repeat(indentSize - spacesCount);
  return { currentIndent, bracketIndent };
};

const toStr = (depth, value) => {
  const { currentIndent, bracketIndent } = getIndent(depth);

  if (typeof value === 'object' && value !== null) {
    const lines = Object
      .entries(value)
      .map(([key, val]) => `${currentIndent}  ${key}: ${toStr(depth + 1, val)}`);
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  }
  return value;
};

const iter = (currentValue, depth) => {
  const { currentIndent, bracketIndent } = getIndent(depth);
  const lines = currentValue.map((item) => {
    const {
      key, type, value, value2,
    } = item;
    const { children } = item;
    switch (type) {
      case 'changed':
        return `${currentIndent}- ${key}: ${toStr(depth + 1, value)}\n${currentIndent}+ ${key}: ${toStr(depth + 1, value2)}`;

      case 'added':
        return `${currentIndent}+ ${key}: ${toStr(depth + 1, value)}`;

      case 'deleted':
        return `${currentIndent}- ${key}: ${toStr(depth + 1, value)}`;

      case 'unchanged':
        return `${currentIndent}  ${key}: ${toStr(depth + 1, value)}`;

      case 'nested':
        return `${currentIndent}  ${key}: ${iter(children, depth + 1)}`;

      default:
        throw new Error(`Unknown type: '${type}'!`);
    }
  });
  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

export default (ast) => iter(ast, 1);
