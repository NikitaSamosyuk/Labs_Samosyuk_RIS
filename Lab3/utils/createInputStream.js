import fs from 'fs';
import { validateFile } from './validateFile.js';

export function createInputStream(inputPath) {
  if (!inputPath) {
    process.stdin.setEncoding('utf-8');
    return process.stdin;
  }

  validateFile(inputPath, 'r');
  return fs.createReadStream(inputPath, { encoding: 'utf-8' });
}
