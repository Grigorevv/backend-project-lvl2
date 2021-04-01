import _ from 'lodash';

const isObject = (value) => (typeof value === 'object');

const buildAst = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2));
  const diff = _.sortBy(keys).map((key) => {
    // ключа нет в 1ом объекте
    if (!_.has(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }
    // ключа нет в 2ом объекте
    if (!_.has(data2, key)) {
      return { key, type: 'deleted', value: data1[key] };
    }
    // значения равны
    if (data1[key] === data2[key]) {
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

  return diff;
};

export default buildAst;
