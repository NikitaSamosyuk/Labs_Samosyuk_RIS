import fs from 'fs';

export function validateFile(path, mode = 'r') {
  try {
    const stat = fs.statSync(path);
    if (!stat.isFile()) {
      throw new Error(`"${path}" не является файлом`);
    }

    const flag = mode === 'r' ? fs.constants.R_OK : fs.constants.W_OK;
    fs.accessSync(path, flag);
  } catch (err) {
    console.error(`Ошибка работы с файлом "${path}": ${err.message}`);
    process.exit(1);
  }
}
