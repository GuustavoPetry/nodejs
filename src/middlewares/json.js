// Middlewares -> são funções que interceptam e manipulam a requisição e resposta de uma rota

// Middleware que converte os dados de uma requisição em JSON
export async function json(req, res) {
    const buffers = [];

    for await (const chunk of req) {
        buffers.push(chunk);
    }

    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString());
    } catch {
        req.body = null;
    }

    res.setHeader("Content-Type", "application/json")
}