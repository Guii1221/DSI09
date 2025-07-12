\
        // echoDuplex.js
        const { Duplex } = require('stream');

        class EchoDuplex extends Duplex {
          constructor(options = {}) {
            super(options);
            this._buffer = [];
          }

          // Chamado quando alguém faz write()
          _write(chunk, _enc, callback) {
            const data = chunk.toString();
            console.log(`[Duplex] recebido (write):`, data.trim());
            this._buffer.push(data);
            callback();
          }

          // Chamado quando alguém faz read()
          _read() {
            if (this._buffer.length) {
              const data = this._buffer.shift();
              console.log(`[Duplex] devolvendo (read):`, data.trim());
              this.push(data); // devolve ao consumidor
            } else {
              this.push(null); // sinaliza EOF
            }
          }
        }

        // --- Teste ---
        const duplex = new EchoDuplex();

        duplex.write('Olá duplex!\\n');
        duplex.write('Mais dados...\\n');
        duplex.end(); // indica que não escreveremos mais

        duplex.on('data', chunk => {
          // Apenas ler para disparar _read()
        });
        duplex.on('end', () => console.log('>>> Leitura duplex finalizada'));
