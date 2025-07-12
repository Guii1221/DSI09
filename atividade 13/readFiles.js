\
        // readFiles.js
        const fs = require('fs');
        const path = require('path');

        const files = ['input1.txt', 'input2.txt'];

        files.forEach(file => {
          const src = path.join(__dirname, file);
          const readStream = fs.createReadStream(src, { encoding: 'utf8' });

          console.log(`\n--- Lendo ${file} ---`);

          readStream.on('data', chunk => {
            console.log(`[${file}] chunk recebido:\n`, chunk);
          });

          readStream.on('end', () => {
            console.log(`>>> Concluída a leitura de ${file}`);
          });

          readStream.on('error', err => {
            console.error(`Erro ao ler ${file}:`, err.message);
          });
        });
