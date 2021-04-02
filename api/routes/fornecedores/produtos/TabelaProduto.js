const Modelo = require('./ModeloTabelaProduto')
const instancia = require('../../../database')
const NotFound = require('../../../errors/NotFound')

module.exports = {
    listar(idFornecedor, criterios = {}) {
        criterios.fornecedor = idFornecedor
        return Modelo.findAll({
            where: criterios,
            raw: true
        })
    },

    inserir(dados) {
        return Modelo.create(dados)
    },

    remover(idProduto, idFornecedor) {
        return Modelo.destroy({
            where: {
                id: idProduto,
                fornecedor: idFornecedor
            }
        })
    },

    async pegarPorId (idProduto, idFornecedor) {
        const encontrado = await Modelo.findOne({
            where: {
                id: idProduto,
                fornecedor: idFornecedor
            },
            raw: true
        })

        if (!encontrado) {
            throw new NotFound('Produto')
        }

        return encontrado
    },

    atualizar (dadosDoProduto, dadosParaAtualizar) {
        return Modelo.update(
            dadosParaAtualizar,
            {
                where: dadosDoProduto
            }
        )
    },

    subtrair (idProduto, idFornecedor, campo, quantidade) {
        return instancia.transaction(async transacao => {
            const produto = await Modelo.findOne({
                where: {
                    id: idProduto,
                    fornecedor: idFornecedor
                }
            })

            produto[campo] = quantidade

            await produto.save()

            return produto
        })
    }
}