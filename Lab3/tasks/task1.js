import { Transform } from 'stream';

function createPhoneNumber(arr) {
  const digits = arr.join('');
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function task1() {
  return new Transform({
    transform(chunk, encoding, callback) {
      const raw = chunk.toString().trim();

      if (!raw) {
        return callback(); //  Игнорируем пустые строки
      }

      try {
        const arr = JSON.parse(raw);

        if (!Array.isArray(arr) || arr.length !== 10) {
          return callback(null, "Ошибка: ожидается массив из 10 чисел\n");
        }

        const result = createPhoneNumber(arr);
        callback(null, result + "\n");
      } catch (err) {
        callback(null, "Ошибка: некорректный JSON\n");
      }
    }
  });
}
