import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";

const server = http.createServer(async (req, res) => {
    const { method, url } = req;

    // Middleware que converte os dados da requisição em JSON
    await json(req, res);

    // Verifica se a rota da requisição é valida e testa o regex retornado no path.routes
    const route = routes.find(route => {
        return route.method == method && route.path.test(url);
    });

    if(route) {
        return route.handler(req, res);
    }

    return res.writeHead(404).end("Not Found");
});

server.listen(3333);

