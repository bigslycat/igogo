const path = require('path');
const fs = require('fs');
const babel = require('@babel/core');

const src = path.resolve(__dirname, '..', 'src');
const esm = path.resolve(__dirname, '..', 'esm');

fs.mkdirSync(esm, { recursive: true });

fs.readdirSync(src)
  .filter(fileName => !/\.test\.js/.test(fileName))
  .map(fileName => path.resolve(src, fileName))
  .map(filePath => ({
    code: babel.transform(fs.readFileSync(filePath, 'utf8')).code,
    name: path.basename(filePath, '.js'),
  }))
  .forEach(file =>
    fs.writeFileSync(path.resolve(esm, `${file.name}.mjs`), file.code, 'utf8'),
  );
