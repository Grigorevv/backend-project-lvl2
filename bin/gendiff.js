#!/usr/bin/env node
// gendiff -f plain ../f1.json ../f2.json
import commander from 'commander';
import genDiff from '../src/index.js';

const { program } = commander.program;

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((file1, file2) => {
    console.log(genDiff(file1, file2, program.format));
  });
program.parse();
