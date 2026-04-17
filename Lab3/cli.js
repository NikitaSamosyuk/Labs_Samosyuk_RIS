#!/usr/bin/env bun
import { Command } from 'commander';
import { createInputStream } from './utils/createInputStream.js';
import { createOutputStream } from './utils/createOutputStream.js';
import { runPipeline } from './utils/runPipeline.js';
import { tasks } from './tasks/index.js';

const program = new Command();

program
  .requiredOption('-t, --task <task>', 'Название задачи')
  .option('-i, --input <file>', 'Входной файл')
  .option('-o, --output <file>', 'Выходной файл')
  .parse(process.argv);

const { task, input, output } = program.opts();

if (!tasks[task]) {
  console.error(`Ошибка: задача "${task}" не найдена`);
  process.exit(1);
}

const inputStream = createInputStream(input);
const outputStream = createOutputStream(output);
const transformStream = tasks[task]();

await runPipeline(inputStream, transformStream, outputStream);
