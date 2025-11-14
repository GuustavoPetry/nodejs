import { randomUUID } from "node:crypto";
import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
    {
        method: "GET",
        path: buildRoutePath("/users"), // Regex
        handler: (req, res) => {
            const users = database.select("users");
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
        method: "DELETE",
        path: buildRoutePath("/users/:id"), // Regex
        handler: (req, res) => {
            return res.end();
        }
    }
]