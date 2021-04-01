const roteador = require('express').Router({ mergeParams: true })
const Serializador = require('../../../Serializador').SerializadorProduto
const Produto = require('./Produto')
const Tabela = require('./TabelaProduto')

roteador.get('/', async (req, res) => {
    const produtos = await Tabela.listar(req.params.idFornecedor)
    const serializador = new Serializador(
        res.getHeader('Content-Type')
    )
    res.send(
        serializador.serializar(produtos)
    )
})

roteador.post('/', async (req, res, proximo) => {
    try {
        const idFornecedor = req.params.idFornecedor
        const corpo = req.body
        const dados = Object.assign({}, corpo, { fornecedor: idFornecedor })
        const produto = new Produto(dados)
        await produto.criar()

        const serializador = new Serializador(
            res.getHeader('Content-Type')
        )
        res.status(201)
        res.send(
            serializador.serializar(produto)
        )
        
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

roteador.get('/:id', async (req, res, proximo) => {
    try {
        const dados = {
            id: req.params.id,
            fornecedor: req.fornecedor.id
        }

        const produto = new Produto(dados)
        await produto.carregar()
        const serializador = new Serializador(
            res.getHeader('Content-Type'),
            ['preco', 'estoque', 'fornecedor', 'dataCriacao', 'dataAtualização', 'versao']
        )
        res.send(
            serializador.serializar(produto)
        )
        
    } catch (erro) {
        proximo(erro)
    }
})

module.exports = roteador