import yaml from 'js-yaml';

const parser = (data, ext) => {
  if (ext === '.json') return JSON.parse(data);
  return yaml.safeLoad(data);
};

export default parser;
