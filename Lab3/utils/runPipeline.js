import { pipeline } from 'stream/promises';

export async function runPipeline(input, transform, output) {
  try {
    await pipeline(input, transform, output);
  } catch (err) {
    console.error('Ошибка при обработке:', err.message);
    process.exit(1);
  }
}
