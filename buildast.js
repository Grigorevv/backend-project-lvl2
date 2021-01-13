import _ from 'lodash';

const getMap = (data, keyData, type) => {
  if (typeof data !== 'object' || data === null) {
    return { key: keyData, value: data, type };
  }
  const res = Object.entries(data).map(([key, value]) => {
    if (typeof value !== 'object' || value === null) {
      return { key, value, type };
    }
    return { key, value: getMap(value, key, type), type };
  });
  return res;
};
const buildAst = (obj1, obj2) => {
  const keys = Object.keys({ ...obj1, ...obj2 });
  const res = keys.map((key) => {
    // ключа нет в 1ом объекте
    if (!_.has(obj1, key)) {
      return (typeof obj2[key] !== 'object' || obj2[key] === null)
        ? { key, value: obj2[key], type: 'added' } : { key, value: getMap(obj2[key], key, 'unchanged'), type: 'added' };
    }
    // ключа нет в 2ом объекте
    if (!_.has(obj2, key)) {
      return (typeof obj1[key] !== 'object' || obj1[key] === null)
        ? { key, value: obj1[key], type: 'deleted' } : { key, value: getMap(obj1[key], key, 'unchanged'), type: 'deleted' };
    }
    // ключи в обоих объектах, значения равны
    if (_.has(obj1, key) && _.has(obj2, key) && obj1[key] === obj2[key]) {
      return getMap(obj1[key], key, 'unchanged');
    }
    // оба значения объекты
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      return { key, value: buildAst(obj1[key], obj2[key]), type: 'children' };
    }
    // строка и объект
    if (typeof obj1[key] === 'object' && obj1[key] !== null) {
      return [{ key, value: getMap(obj1[key], key, 'unchanged'), type: 'before' }, getMap(obj2[key], key, 'after')];
    }
    // новая строчка - тесты не проходят
    return [getMap(obj1[key], key, 'before'), getMap(obj2[key], key, 'after')];
  });
  return res.flat();
};

export default buildAst;
