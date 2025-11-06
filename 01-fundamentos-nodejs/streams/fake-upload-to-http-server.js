import http from "node:http";
import { Readable } from "node:stream";

class OneToHundredStream extends Readable {
    index = 1;

    _read() {
        const i = this.index++;

        setTimeout(() => {
            if (i > 100) {
                this.push(null);
            } else {
                const buf = Buffer.from(String(i));
                this.push(buf);
            }
        }, 1000)
    }
}

const req = http.request(
    {hostname:"localhost", port:3334, method:"POST"},
    (res) => res.pipe(process.stdout)
);

new OneToHundredStream().pipe(req);