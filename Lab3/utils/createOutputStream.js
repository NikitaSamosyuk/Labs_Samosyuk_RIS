import fs from 'fs';
import { validateFile } from './validateFile.js';

export function createOutputStream(outputPath) {
  if (!outputPath) {
    return process.stdout;
  }

  if (fs.existsSync(outputPath)) {
    validateFile(outputPath, 'w');
  }

  return fs.createWriteStream(outputPath, { encoding: 'utf-8' });
}
