// permitir que outras aplicações consumam meu serviço
// eu consigo restringir o acesso para algumas origens
//este middleware adiciona uns cabeçalhos na resposta para habilitar o cors

module.exports = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
}

/* o middleware precisa SEMPRE chamar o próximo middleware.. RESPONDER a requisição
ou retornar uma mensagem de ERRO (status 500) ou chama o NEXT.. se não vai entrar no middleware
e vai parar aqui*/