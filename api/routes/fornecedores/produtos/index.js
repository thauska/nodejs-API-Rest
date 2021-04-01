const roteador = require('express').Router({ mergeParams: true })
const Produto = require('./Produto')
const Tabela = require('./TabelaProduto')

roteador.get('/', async (req, res) => {
    const produtos = await Tabela.listar(req.params.idFornecedor)
    res.send(
        JSON.stringify(produtos)
    )
})

roteador.post('/', async (req, res, proximo) => {
    try {
        const idFornecedor = req.params.idFornecedor
        const corpo = req.body
        const dados = Object.assign({}, corpo, { fornecedor: idFornecedor })
        const produto = new Produto(dados)
        await produto.criar()
        
        res.status(201)
        res.send(produto)
    } catch (erro) {
        proximo(erro)
    }
})

roteador.delete('/:id', async (req, res) => {
    const dados = {
        id: req.params.id,
        fornecedor: req.params.idFornecedor
    }

    const produto = new Produto(dados)
    await produto.apagar()

    res.status(204)
    res.end()

})

module.exports = roteador