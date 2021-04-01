const toStr = (value) => {
  if (typeof value === 'object' && value !== null) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return value;
};

export default (ast) => {
  const iter = (currentValue, anchestry = []) => {
    const result = currentValue.map((item) => {
      const {
        key, type, value, value2,
      } = item;
      const { children } = item;

      switch (type) {
        case 'unchanged':
          return '';

        case 'added':
          return `Property '${[...anchestry, key].join('.')}' was added with value: ${toStr(value)}`;

        case 'deleted':
          return `Property '${[...anchestry, key].join('.')}' was removed`;

        case 'changed':
          return `Property '${[...anchestry, key].join('.')}' was updated. From ${toStr(value)} to ${toStr(value2)}`;

        case 'nested':
          return `${iter(children, [...anchestry, key])}`;

        default:
          throw new Error(`Unknown type: '${type}'!`);
      }
    });
    return result.filter((item) => item !== '').join('\n');
  };
  return iter(ast);
};
