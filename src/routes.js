import { randomUUID } from "node:crypto";
import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
    {
        method: "GET",
        path: buildRoutePath("/users"), // Regex
        handler: (req, res) => {
            const { search } = req.query;

            const users = database.select("users", search ? {
                name: search,
                email: search
            } : null);

            return res.end(JSON.stringify(users));
        }
    },
    {
        method: "POST",
        path: buildRoutePath("/users"), // Regex
        handler: (req, res) => {
            const { name, email } = req.body;

            const user = {
                id: randomUUID(), // Cria ID único
                name,
                email
            };

            database.insert("users", user);

            return res.writeHead(201).end(JSON.stringify(user));
        }
    },
    {
        method: "PUT",
        path: buildRoutePath("/users/:id"), // Regex
        handler: (req, res) => {
            const { id } = req.params;
            const { name, email } = req.body;

            const execute = database.update("users", id, { name, email });

            if(execute) {
                return res.writeHead(204).end();
            } else {
                return res.writeHead(404).end();
            }

        }
    },
    {
        method: "DELETE",
        path: buildRoutePath("/users/:id"), // Regex
        handler: (req, res) => {
            const { id } = req.params;

            const execute = database.delete("users", id);

            if(execute) {
                return res.writeHead(204).end();
            } else {
                return res.writeHead(404).end();
            }

        }
    }
]