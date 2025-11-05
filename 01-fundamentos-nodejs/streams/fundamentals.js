// Fundamentos de Streams

import { Readable } from "node:stream";

class OneToHundredStream extends Readable {
    index = 0;

    // Metódo obrigatório em classes que extendem 'Readable'
    _read() {
        const i = this.index++;

        // Metódo que executa um bloco a cada intervalo de tempo
        setTimeout(() => {
            if (i > 100) {
                this.push(null);
            } else {
                // converte 'i' em Buffer, necessita passar argumento como string
                const buf = Buffer.from(String(i));
                this.push(buf);
            }
        }, 1000);
    }
}

// Utiliza pipe() para passar os dados de Readable Stream (Fonte) para Writeable Stream (Destino)
new OneToHundredStream().pipe(process.stdout);