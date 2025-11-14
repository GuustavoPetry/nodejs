// Para encadear dados entre Stream é converter o dado no tipo Buffer
// Buffer.from() -> argumento necessita ser string

import { Readable, Transform, Writable } from "node:stream";

// Stream de Leitura (Readable)
class OneToHundredStream extends Readable {
    index = 1;

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

// Stream de Transformação (Transform)
class InverseNumber extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1;
        callback(null, Buffer.from(String(transformed)));
    }
}

// Stream de Escrita (Writeable)
class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10);
        callback();
    }
}

/**
 * Utiliza pipe() para encadear os dados de Readable Stream (Fonte) 
 * para Transform Stream (Modificador) Writeable Stream (Destino)
 */
new OneToHundredStream()
    .pipe(new InverseNumber())
    .pipe(new MultiplyByTenStream());