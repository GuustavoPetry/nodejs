import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";
import { extractQueryParams } from "./utils/extract-query-params.js";

const server = http.createServer(async (req, res) => {
    const { method, url } = req;

    // Middleware que converte os dados da requisição em JSON
    await json(req, res);

    // Verifica se a rota da requisição é valida e testa o regex retornado no path.routes
    const route = routes.find(route => {
        return route.method == method && route.path.test(url);
    });

    if(route) {
        // Captura os Routes Parameters com regex e separa em groups
        const routeParams = req.url.match(route.path);

        const { query, ...params } = routeParams.groups;

        // Passa os valores de Groups para req.params
        req.params = params;
        req.query = query ? extractQueryParams(query) : {};

        // Dessa forma as rotas tem acesso aos paramêtros da requisição
        return route.handler(req, res);
    }

    return res.writeHead(404).end("Not Found");
});

server.listen(3333);

