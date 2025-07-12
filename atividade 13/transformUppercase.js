\
        // transformUppercase.js
        const fs = require('fs');
        const path = require('path');
        const { Transform } = require('stream');

        const files = ['input1.txt', 'input2.txt'];

        // Transform que converte para maiúsculas
        class UpperCaseTransform extends Transform {
          _transform(chunk, _enc, callback) {
            this.push(chunk.toString().toUpperCase());
            callback();
          }
        }

        files.forEach(file => {
          const src = path.join(__dirname, file);
          const dest = path.join(__dirname, `upper_${file}`);

          const upper = new UpperCaseTransform();

          console.log(`\n--- Transformando ${file} -> upper_${file} ---`);

          fs.createReadStream(src, { encoding: 'utf8' })
            .pipe(upper)
            .pipe(fs.createWriteStream(dest, { encoding: 'utf8' }))
            .on('finish', () => {
              console.log(`>>> Transformação e gravação concluídas para ${file}`);
            })
            .on('error', err => {
              console.error(`Erro no pipeline de ${file}:`, err.message);
            });
        });
