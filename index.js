// gendiff ./__fixtures__/f1.json ./__fixtures__/f2.json
import commander from 'commander';
import genDiff from './gendiff.js';

const { program } = commander.program;

const readingCommandLine = () => {
  program
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .arguments('<filepath1> <filepath2>');

  const pathToFile = program.parse(process.argv);
  const diff = genDiff(pathToFile.args[0], pathToFile.args[1]);
  return diff;
};

export default readingCommandLine;
