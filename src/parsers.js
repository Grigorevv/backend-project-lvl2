import yaml from 'js-yaml';

export default (data, format) => ((format === '.json') ? JSON.parse(data) : yaml.safeLoad(data));
