export default (ast, replacer = ' ', spacesCount = 4) => {
  const iter = (currentValue, depth, curValue) => {
    if ((typeof curValue !== 'object' || curValue === null) && curValue !== undefined) {
      return curValue;
    }

    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize - 2);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);

    if (typeof curValue === 'object') { // если значение объект, но не children
      const lines2 = Object
        .entries(curValue)
        .map(([key, val]) => `${currentIndent}  ${key}: ${iter(1, depth + 1, val)}`);
      return ['{', ...lines2, `${bracketIndent}}`].join('\n');
    }
    const lines = currentValue.map((item) => {
      const {
        key, type, value, value2,
      } = item;
      const { children } = item;
      switch (type) {
        case 'changed':
          return `${currentIndent}- ${key}: ${iter(children, depth + 1, value)}\n${currentIndent}+ ${key}: ${iter(children, depth + 1, value2)}`;

        case 'added':
          return `${currentIndent}+ ${key}: ${iter(children, depth + 1, value)}`;

        case 'deleted':
          return `${currentIndent}- ${key}: ${iter(children, depth + 1, value)}`;

        case 'unchanged':
          return `${currentIndent}  ${key}: ${iter(children, depth + 1, value)}`;

        default:
          break;
      }
      return `${currentIndent}  ${key}: ${iter(children, depth + 1)}`;
    });
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  return iter(ast, 1);
};
