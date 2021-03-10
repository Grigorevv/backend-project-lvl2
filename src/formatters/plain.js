const getValue = (value) => {
  if (typeof value === 'object' && value !== null) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return value;
};
export default (ast) => {
  const iter = (currentValue, curType, curKey, anchestry = '') => {
    if (curType === 'nested') anchestry += `${curKey}.`;

    const result = currentValue.map((item) => {
      const {
        key, type, value, value2,
      } = item;

      switch (type) {
        case 'unchanged':
          return '';

        case 'added':
          return `Property '${anchestry}${key}' was added with value: ${getValue(value)}`;

        case 'deleted':
          return `Property '${anchestry}${key}' was removed`;

        case 'changed':
          return `Property '${anchestry}${key}' was updated. From ${getValue(value)} to ${getValue(value2)}`;

        default:
          break;
      }
      const { children } = item;
      return `${iter(children, type, key, anchestry)}`;
    });
    return result.filter((item) => item !== '').join('\n');
  };
  return iter(ast);
};
