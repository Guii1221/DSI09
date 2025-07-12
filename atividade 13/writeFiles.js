\
        // writeFiles.js
        const fs = require('fs');
        const path = require('path');

        const outputs = [
          { name: 'output1.txt', lines: ['Primeira linha do arquivo 1', 'Segunda linha do arquivo 1'] },
          { name: 'output2.txt', lines: ['Primeira linha do arquivo 2', 'Segunda linha do arquivo 2'] }
        ];

        outputs.forEach(({ name, lines }) => {
          const dest = path.join(__dirname, name);
          const writeStream = fs.createWriteStream(dest, { encoding: 'utf8' });

          lines.forEach(l => writeStream.write(l + '\n'));

          writeStream.end(); // sinaliza término

          writeStream.on('finish', () => {
            console.log(`>>> Gravação concluída em ${name}`);
          });

          writeStream.on('error', err => {
            console.error(`Erro ao gravar ${name}:`, err.message);
          });
        });
