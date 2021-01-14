import yaml from 'js-yaml';

export default (data, ext) => ((ext === '.json') ? JSON.parse(data) : yaml.safeLoad(data));
