import { Transform } from 'stream';

export default function task1() {
  return new Transform({
    transform(chunk, encoding, callback) {
      const input = chunk.toString();
      const result = input; // позже заменим на реальную задачу
      callback(null, result);
    }
  });
}
