const prefix = {
  added: '+',
  deleted: '-',
  unchanged: '',
  children: '',
  before: '-',
  after: '+',
};

const stylish = (ast, replacer = ' ', spacesCount = 4) => {
  const iter = (currentValue, depth, status) => {
    if (typeof currentValue !== 'object' || currentValue === null) {
      return `${currentValue}`;
    }
    const { key: key1, value: value1 } = currentValue;
    if (key1 !== undefined) {
      return `${value1}`;
    }

    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize - 1);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);

    if (status === 'children') {
      currentValue.sort((a, b) => {
        if (a.key > b.key) {
          return 1;
        }
        if (a.key < b.key) {
          return -1;
        }
        return 0;
      });
    }
    const lines = currentValue.map((item) => {
      const { key, value, type } = item;
      return `${currentIndent.substring(0, currentIndent.length - prefix[type].length)}${prefix[type]} ${key}: ${iter(value, depth + 1, type)}`;
    });
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  return iter(ast, 1, 'children');
};

export default stylish;
