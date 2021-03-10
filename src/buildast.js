import _ from 'lodash';

const isObject = (value) => (typeof value === 'object');

const buildAst = (data1, data2) => {
  const keys = Object.keys({ ...data1, ...data2 });

  const ast = keys.sort().map((key) => {
    // ключа нет в 1ом объекте
    if (!_.has(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }
    // ключа нет в 2ом объекте
    if (!_.has(data2, key)) {
      return { key, type: 'deleted', value: data1[key] };
    }
    // ключи в обоих объектах, значения равны
    if (_.has(data1, key) && _.has(data2, key) && data1[key] === data2[key]) {
      return { key, type: 'unchanged', value: data1[key] };
    }
    // оба значения объекты
    if (isObject(data1[key]) && isObject(data2[key])) {
      return { key, type: 'nested', children: buildAst(data1[key], data2[key]) };
    }
    return {
      key, type: 'changed', value: data1[key], value2: data2[key],
    };
  });

  return ast;
};

export default buildAst;
