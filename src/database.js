import fs from "node:fs/promises";

    // Define o caminho que o arquivo db.json será salvo
    const databasePath = new URL("../db.json", import.meta.url);

export class Database {
    // # -> define uma propriedade ou método de classe como Private, não pode ser acessada por outros arquivos
    #database = {};

    // Lê o arquivo db.json e atribui os valores na propriedade #database
    // Caso o arquivo não exista, executa #persist() que cria o arquivo vazio
    constructor() {
        // Executa assim que a classe Database é instanciada
        fs.readFile(databasePath, "utf-8")
            .then(data => {
                this.#database = JSON.parse(data);
            })
            .catch(() => {
                this.#persist();
            });
    }

    // Função para salvar os dados em arquivo JSON
    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database));
    }

    // Função que retorna todos os dados de uma determinada chave da propriedade #database
    select(table) {
        const data = this.#database[table] ?? [];
        return data;
    }

    // Função que verifica se já existe a chave na propriedade #database e insere os dados
    // Caso a chave ainda não exista cria e atribui os dados
    insert(table, data) {
        if(Array.isArray(this.#database[table])) {
            this.#database[table].push(data);
        } else {
            this.#database[table] = [data];
        }

        // Persiste os dados em arquivo JSON
        this.#persist();

        return data
    }

    update(table, id, data) {
        const rowIndex = this.#database[table].findIndex(row => row.id == id);

        if(rowIndex > -1) {
            this.#database[table][rowIndex] = { id, ...data };
            this.#persist();
            
            return true;
        }
        return false;
    }

    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id == id);

        if(rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1);
            this.#persist();

            return true;
        }
        return false;
    }
}