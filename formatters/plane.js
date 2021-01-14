/* eslint-disable no-param-reassign */
const complexValue = '[complex value]';
const getStringValue = (value) => ((typeof value !== 'string' || value === complexValue) ? value : `'${value}'`);

const plane = (ast) => {
  const iter = (currentValue, anchestry = '', currKey, currType, valueBefore = '') => {
    if (currType === 'children') {
      anchestry += `${currKey}.`;
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
    if (currType === 'added') {
      currentValue = (typeof currentValue === 'object') ? complexValue : currentValue;
      return `Property '${anchestry}${currKey}' was added with value: ${getStringValue(currentValue)}`;
    }

    if (currType === 'deleted') {
      return `Property '${anchestry}${currKey}' was removed`;
    }

    if (currType === 'after') {
      return `Property '${anchestry}${currKey}' was updated. From ${getStringValue(valueBefore)} to ${getStringValue(currentValue)}`;
    }

    const result = currentValue.map((item) => {
      const { key, value, type } = item;
      if (type === 'unchanged') return '';

      if (type === 'before') {
        valueBefore = (typeof value === 'object') ? complexValue : value;
        return '';
      }
      return `${iter(value, anchestry, key, type, valueBefore)}`;
    });
    return result.filter((item) => item !== '').join('\n');
  };
  return iter(ast);
};

export default plane;
