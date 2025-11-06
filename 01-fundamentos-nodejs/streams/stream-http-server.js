import http from "node:http";
import { Transform } from "node:stream";

/**
 * Server recebe requisição (Readable Stream) encadeia os dados 
 * em uma Transform Stream e encadeia os dados transformados na
 * resposta (Writeable Stream)
 */

class InverseNumber extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1;
        console.log(transformed);
        callback(null, Buffer.from(String(transformed)));
    }
}

// req => Readable Stream
// res => Writeable Stream
const server = http.createServer((req, res) => {
    return req.pipe(new InverseNumber()).pipe(res);
});

server.listen(3334);    