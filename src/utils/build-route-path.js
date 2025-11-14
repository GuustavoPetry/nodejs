// Função utilitária que utiliza regex para capturar Route Parameters de forma dinâmica
export function buildRoutePath(path) {
    // Define regex para validar Route Params
    const routeParametersRegex = /:([a-zA-z]+)/g;

    // Troca todos os matchs do routeParameterRegex por uma nova regex
    const pathWithParams = path.replaceAll(routeParametersRegex, "([a-z0-9\-_]+)"); // Nova Rota => /users/([a-z0-9-_]+)

    // Define uma nova regex utilizando pathWithParams, que inclui o endpoint 'users'
    const pathRegex = new RegExp(`^${pathWithParams}`);

    // Retorna uma expressão regular
    return pathRegex;
}

// Teste da Regex que validar Route Params
// const testRegex = /\/users\/([a-z0-9-_]+)/;