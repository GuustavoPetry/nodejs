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

    // Função para atualizar um registro já existente no banco de dados
    update(table, id, data) {
        // Busca o index de um registro que contenha determinado ID
        const rowIndex = this.#database[table].findIndex(row => row.id == id);

        // Se encontrou algum index, executa o update e persiste os dados no arquivo JSON
        if(rowIndex > -1) {
            this.#database[table][rowIndex] = { id, ...data };
            this.#persist();
            
            return true;
        }
        return false;
    }
    
    // Função para deletar um registro do banco de dados
    delete(table, id) {
        // Busca o index de um registro que contenha determinado ID
        const rowIndex = this.#database[table].findIndex(row => row.id == id);

        // Se encontrou algum index, executa o delete e persiste os dados no arquivo JSON
        if(rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1);
            this.#persist();

            return true;
        }
        return false;
    }
}