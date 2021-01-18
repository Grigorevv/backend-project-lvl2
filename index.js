// gendiff --format plain ./__fixtures__/plainf1.json ./__fixtures__/plainf2.json
// gendiff --format stylish ./__fixtures__/plainf1.json ./__fixtures__/plainf2.json
// gendiff -f json ./__fixtures__/nestedf1.json ./__fixtures__/nestedf2.json
// gendiff ./__fixtures__/nestedf1.yml ./__fixtures__/nestedf2.yml
import commander from 'commander';
import genDiff from './gendiff.js';

const { program } = commander.program;

const readingCommandLine = () => {
  program
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format', 'stylish')
    .arguments('<filepath1> <filepath2>');
  const pathToFile = program.parse(process.argv);
  const formatName = program.opts().format;
  const diff = genDiff(pathToFile.args[0], pathToFile.args[1], formatName);
  return diff;
};

export default readingCommandLine;
