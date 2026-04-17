import { Transform } from 'stream';

function arrayDiff(a, b) {
  const remove = new Set(b);
  return a.filter(x => !remove.has(x));
}

export default function task2() {
  return new Transform({
    transform(chunk, encoding, callback) {
      const raw = chunk.toString().trim();

      if (!raw) {
        return callback(); // игнорируем пустые строки
      }

      try {
        const [aStr, bStr] = raw.split(":");

        if (!aStr || !bStr) {
          return callback(null, "Ошибка: ожидается формат [A]:[B]\n");
        }

        const arrA = JSON.parse(aStr);
        const arrB = JSON.parse(bStr);

        if (!Array.isArray(arrA) || !Array.isArray(arrB)) {
          return callback(null, "Ошибка: оба параметра должны быть массивами\n");
        }

        const result = arrayDiff(arrA, arrB);
        callback(null, JSON.stringify(result) + "\n");

      } catch (err) {
        callback(null, "Ошибка: некорректный JSON\n");
      }
    }
  });
}
